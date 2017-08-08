import React from "react";
import {hashHistory} from "react-router";
import {List, TextareaItem, WhiteSpace, NavBar, Drawer, TabBar, Icon} from "antd-mobile";
var marked = require('marked');

let Global = require('../Components/Global');
// import MenuBar from './MenuBar';
const tabBarData = [{
    title: '首页',
    key: 'home',
    link: '/home',
    icon: 'koubei-o',
    selectedIcon: 'koubei',
    style: {fontSize: 20}
}, {
    title: '赛事',
    key: 'tournament',
    link: '/tournament',
    icon: 'check-circle-o',
    selectedIcon: 'check-circle',
    style: {fontSize: 20}
}, {
    title: '小队',
    key: 'team',
    link: '/team',
    icon: 'cross-circle-o',
    selectedIcon: 'cross-circle',
    style: {fontSize: 20}
}, {
    title: '小站',
    key: 'station',
    link: '/station',
    icon: 'koubei-o',
    selectedIcon: 'koubei',
    style: {fontSize: 20}
}, {
    title: '我的',
    key: 'me',
    link: '/me',
    icon: 'koubei-o',
    selectedIcon: 'koubei',
    style: {fontSize: 20}
}];
const translation = {
    'home':'首页',
    'tournament':'赛事',
    'station':'小站',
    'team':'小队',
    'me':'我的',
}
export default class MenuBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'app',
            open: false,
            focused: false,
            value: '',
            selectedTab: 'home',
            hidden: false
        };

        this.getCookie = this.getCookie.bind(this);
        this.getCurrentCount = this.getCurrentCount.bind(this);
    }
    getCookie(c_name){
        if (document.cookie.length>0){
            var c_start=document.cookie.indexOf(c_name + "=")
            if (c_start!=-1){ 
                c_start=c_start + c_name.length+1 
                var c_end=document.cookie.indexOf(";",c_start)
                if (c_end==-1) c_end=document.cookie.length
                return unescape(document.cookie.substring(c_start,c_end))
            } 
        }
        return ""
    }
    getCurrentCount(token){
        const url = 'http://localhost:8080/api/account';
        var this_ = this;
        console.log(token)
        new Promise((resolve,reject)=>{
            fetch(url,{
                    headers:{
                        'Authorization':'Bearer '+token
                    }
                })
                .then((response)=>response.json())
                .then((result)=>{
                    Global.user = result;
                    console.log(result);
                    console.log('成功登陆')
                })
                .then((result)=>{
                    resolve(result);
                })
                .catch(error=>{
                    reject(error);
                })
        })
    }

    componentWillMount() {
        
        const path = hashHistory.getCurrentLocation().pathname;
        // console.log(path);
        // 如果第一次进入，不会触发componentWillReceiveProps, 设置为home
        if(path === '/'){
            this.setState({
                selectedTab: 'home'
            });
        }else{
            this.setState({
                selectedTab: hashHistory.getCurrentLocation().pathname.replace('/',''),
            });
        }
        console.log(this.getCookie('id_token'))
        this.getCurrentCount(this.getCookie('id_token'))
    }
    
    
    // 当节点初次被放入的时候 componentWillReceiveProps 并不会被触发。
    componentWillReceiveProps(nextprops) {
        // console.log(nextprops);
        this.setState({
            selectedTab: nextprops.tab,
            title: translation[nextprops.tab]
        });
    }
    render() {
        // console.log(this.props.route, this.props.params, this.props.routeParams);
        // console.log(this.state.selectedTab);
        
        console.log('先进我')
        return (
            <div className="container">
                <NavBar mode="dark" style={{backgroundColor:'#19191d',color:'white'}}
                    onLeftClick={() => {
                        hashHistory.goBack();
                        console.log(hashHistory)
                    }}
                    rightContent={<b onClick={() => this.setState({ open: true,hidden:!this.state.hidden })}>...</b>}
                >
                    {this.state.title}
                </NavBar>


                <TabBar
                    unselectedTintColor="#5A5C5E"
                    tintColor="#CB6228"
                    barTintColor="#1c1c1e"
                    hidden={this.state.hidden}
                >
                    {tabBarData.map((item, index) => (
                        <TabBar.Item
                            key={item.key}
                            style={item.style}
                            title={item.title}
                            icon={<Icon type={item.icon} />}
                            selectedIcon={<Icon type={item.selectedIcon} />}
                            selected={this.state.selectedTab === item.key}
                            onPress={() => {
                                hashHistory.push(item.link)
                            }}
                        >
                        </TabBar.Item>
                    ))}
                </TabBar>
                {/*<div className="fixed-bottom">底部固定条</div>*/}
            </div>
        );
    }
}
