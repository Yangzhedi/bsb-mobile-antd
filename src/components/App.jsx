import React from "react";
import {hashHistory} from "react-router";
import Stage2 from "./Stage2";
import Stage1 from "./Stage1";
import Stage3 from "./Stage3";
import {List, TextareaItem, WhiteSpace, NavBar, Drawer, TabBar, Icon} from "antd-mobile";
var marked = require('marked');
// import MenuBar from './MenuBar';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'app',
            open: false,
            focused: false,
            value: '',
            selectedTab: 'home',
            hidden: false,
        };
    }

    componentWillReceiveProps(nextprops) {
        console.log(nextprops)
        this.setState({
            selectedTab: nextprops.tab,
        });
    }
    componentWillMount() {
        console.log(hashHistory.getCurrentLocation().pathname)
        this.setState({
            selectedTab: hashHistory.getCurrentLocation().pathname.replace('/',''),
        });
    }
    renderContent(pageText) {
        // const obj = this.state.selectedTab == 'redTab' ?  <Stage2></Stage2> :  <Stage3></Stage3>
        return (
            <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>

                <div style={{ paddingTop: 60 }}>你已点击“{pageText}” tab， 当前展示“{pageText}”信息

                </div>
                <a style={{ display: 'block', marginTop: 40, marginBottom: 600, color: '#108ee9' }}
                   onClick={(e) => {
              e.preventDefault();
              this.setState({
                hidden: !this.state.hidden,
              });
            }}
                >
                    点击切换 tab-bar 显示/隐藏
                </a>
            </div>
        );
    }

    render() {
        // console.log(this.props.route, this.props.params, this.props.routeParams);
        console.log(this.state.selectedTab);
        const tabBarData = [{
            title: '首页',
            key: 'home',
            link: '/home',
            icon: 'koubei-o',
            selectedIcon: 'koubei',
            style: {fontSize: 20},
            children: <Stage1 />
        }, {
            title: '赛事',
            key: 'tournament',
            link: '/tournament',
            icon: 'check-circle-o',
            selectedIcon: 'check-circle',
            style: {fontSize: 20},
            children: <Stage2 />
        }, {
            title: '小队',
            key: 'team',
            link: '/team',
            icon: 'cross-circle-o',
            selectedIcon: 'cross-circle',
            style: {fontSize: 20},
            children: <Stage3 />
        }, {
            title: '小站',
            key: 'station',
            link: '/station',
            icon: 'koubei-o',
            selectedIcon: 'koubei',
            style: {fontSize: 20},
            children: <Stage1 />
        }, {
            title: '我的',
            key: 'me',
            link: '/me',
            icon: 'koubei-o',
            selectedIcon: 'koubei',
            style: {fontSize: 20},
            children: <Stage2 />
        }]
        return (
            <div className="container">
                <NavBar mode="dark" style={{backgroundColor:'#19191d',color:'white'}}
                    onLeftClick={() => {
                        hashHistory.goBack()
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
