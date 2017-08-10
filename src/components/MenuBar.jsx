import React from "react";
import {hashHistory} from "react-router";
import {List, TextareaItem, WhiteSpace, NavBar, Drawer, TabBar, Icon, ActivityIndicator} from "antd-mobile";

let Global = require('../components/Global');
import { getCookie } from '../components/Cookie';
import  HTTPUtil  from '../components/HTTPUtil';
// import MenuBar from './MenuBar';
const tabBarData = [
{
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
    'info':'账户信息'
}
export default class MenuBar extends React.Component {
    // static defaultProps = {
    //     dataIsReady: () => {}
    // };

    constructor(props) {
        super(props);
        this.state = {
            title: 'app',
            open: false,
            focused: false,
            value: '',
            selectedTab: 'home',
            hidden: false,
            loading: true
        };
    }
   
    componentWillMount() {
        const path = hashHistory.getCurrentLocation().pathname;
        // console.log(path);
        // info  要根据route去找me
        // 如果第一次进入，不会触发componentWillReceiveProps, 设置为home
        if(path === '/'){
            this.setState({
                selectedTab: 'home'
            });
        } else if (path === '/info'){
            this.setState({
                selectedTab: 'me',
                title:translation['info']
            });
        } else{
            this.setState({
                selectedTab: path.replace('/','')
            });
        }
        console.log(path.replace('/', ''));
        // console.log(getCookie('id_token'))
        
    }
    
    
    // 当节点初次被放入的时候 componentWillReceiveProps 并不会被触发。
    componentWillReceiveProps(nextprops) {
        // console.log(nextprops);
        if(nextprops.title){
            this.setState({
                selectedTab: nextprops.tab,
                title: translation[nextprops.title]
            })
        }else{
            this.setState({
                selectedTab: nextprops.tab,
                title: translation[nextprops.tab]
            })
        }
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
