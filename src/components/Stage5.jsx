import React from 'react';
import {
  SearchBar, Tabs, Steps,
} from 'antd-mobile';
import App from './App';

const TabPane = Tabs.TabPane;

export default class Demo extends React.Component {
  componentDidMount() {
    // this.props.changeTitle('Stage 2');
  }
  render() {
    return (<div>

      <App tab='me'></App>
      Stage 5</div>);
  }
}