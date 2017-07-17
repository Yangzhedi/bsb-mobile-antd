import React from 'react';
import { hashHistory, browserHistory, Link } from 'react-router';
import Stage2 from './Stage2';
import Stage1 from './Stage1';
import Stage3 from './Stage3';
import { List, TextareaItem, WhiteSpace, NavBar, Drawer, TabBar, Icon } from 'antd-mobile';
var marked = require('marked');
// import MenuBar from './MenuBar';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      title: 'app',
      open: false,
      focused: false,
      value:'',
      selectedTab: 'home',
      hidden: false,
    };
  }
  componentWillMount(){
    marked.setOptions({
      renderer: new marked.Renderer(),
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false
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
    const tabBarData = [{
      title: '首页',
      key: 'home',
      icon: 'koubei-o',
      selectedIcon: 'koubei',
      link: '/home',
      style: {fontSize:20}
    },{
      title: '赛事',
      key:'tournament',
      icon: 'check-circle-o',
      selectedIcon: 'check-circle',
      link: '/tournament',
      style: {fontSize:20}
    },{
      title: '小队',
      key:'team',
      icon: 'cross-circle-o',
      selectedIcon: 'cross-circle',
      link: '/team',
      style: {fontSize:20}
    },{
      title: '小站',
      key: 'station',
      icon: 'koubei-o',
      selectedIcon: 'koubei',
      link: '/station',
      style: {fontSize:20}
    },{
      title: '我的',
      key:'me',
      icon: 'koubei-o',
      selectedIcon: 'koubei',
      link: '/me',
      style: {fontSize:20}
    }]
    return (
      <div className="container">
        <NavBar mode="dark" style={{backgroundColor:'#19191d',color:'white'}}
          onLeftClick={() => hashHistory.goBack()}
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
              this.setState({
                selectedTab: item.key,
              });
            }}
          >
          <Stage2 />
          </TabBar.Item>
        ))}
      </TabBar>
        {/*<div className="fixed-bottom">底部固定条</div>*/}
      </div>
    );
  }
}
