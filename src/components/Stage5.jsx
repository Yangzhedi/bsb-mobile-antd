import React from 'react';
import {
  SearchBar, Tabs, Steps,
} from 'antd-mobile';
import MenuBar from './MenuBar';

const TabPane = Tabs.TabPane;

export default class Demo extends React.Component {
  componentDidMount() {
    // this.props.changeTitle('Stage 2');
  }
  render() {
    return (<div>

      <MenuBar tab='me'></MenuBar>
      Stage 5</div>);
  }
}