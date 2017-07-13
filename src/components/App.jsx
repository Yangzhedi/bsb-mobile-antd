import React from 'react';
import { hashHistory, browserHistory, Link } from 'react-router';
import Stage2 from './Stage2';
import Stage1 from './Stage1';
import Stage3 from './Stage3';
import { List, TextareaItem, WhiteSpace, NavBar, Drawer, TabBar, Icon } from 'antd-mobile';
var marked = require('marked');

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      title: 'app',
      open: false,
      focused: false,
      value:'',
      selectedTab: 'redTab',
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
        <TabBar.Item
          title="首页"
          key="首页"
          style={{fontSize:20}}
          icon={<div style={{
            width: '0.44rem',
            height: '0.44rem',
            background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  0.42rem 0.42rem no-repeat' }}
          />
          }
          selectedIcon={<div style={{
            width: '0.44rem',
            height: '0.44rem',
            background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  0.42rem 0.42rem no-repeat' }}
          />
          }
          selected={this.state.selectedTab === 'blueTab'}
          badge={1}
          onPress={() => {
            this.setState({
              selectedTab: 'blueTab',
            });
          }}
          data-seed="logId"
        >
          {this.renderContent('首页')}
        </TabBar.Item>

        <TabBar.Item
          title="赛事"
          key="赛事"
          style={{fontSize:20}}
          icon={<div style={{
            width: '0.44rem',
            height: '0.44rem',
            background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  0.42rem 0.42rem no-repeat' }}
          />
          }
          selectedIcon={<div style={{
            width: '0.44rem',
            height: '0.44rem',
            background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  0.42rem 0.42rem no-repeat' }}
          />
          }
          selected={this.state.selectedTab === 'blueTab'}
          badge={1}
          onPress={() => {
            this.setState({
              selectedTab: 'blueTab',
            });
          }}
          data-seed="logId"
        >
        {this.renderContent('赛事')}
        </TabBar.Item>
        <TabBar.Item
          style={{fontSize:20}}
          icon={<Icon type="koubei-o" size="md" />}
          selectedIcon={<Icon type="koubei" size="md" />}
          title="小队"
          key="小队"
          // badge={'new'}
          selected={this.state.selectedTab === 'redTab'}
          onPress={() => {
            hashHistory.push("/s1");
            this.setState({
              selectedTab: 'redTab',
            });
          }}
          data-seed="logId1"
        >
          
            {this.renderContent('小队')}
          
        </TabBar.Item>
          
        <TabBar.Item
          style={{fontSize:20}}
          icon={
            <div style={{
              width: '0.44rem',
              height: '0.44rem',
              background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  0.42rem 0.42rem no-repeat' }}
            />
          }
          selectedIcon={
            <div style={{
              width: '0.44rem',
              height: '0.44rem',
              background: 'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  0.42rem 0.42rem no-repeat' }}
            />
          }
          title="小站"
          key="小站"
          dot
          selected={this.state.selectedTab === 'greenTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'greenTab',
            });
          }}
        >
          {this.renderContent('小站')}
        </TabBar.Item>

        <TabBar.Item
          style={{fontSize:20}}
          icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg' }}
          selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg' }}
          title="我的"
          key="我的"
          selected={this.state.selectedTab === 'yellowTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'yellowTab',
            });
          }}
        >
          {this.renderContent('我的')}
        </TabBar.Item>
      </TabBar>

        {/*<div className="fixed-bottom">底部固定条</div>*/}
      </div>
    );
  }
}
