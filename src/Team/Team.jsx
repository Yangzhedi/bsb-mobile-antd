import React from 'react';
import { createForm } from 'rc-form';
import moment from 'moment'; // moment.min ~= 48kb
import { district } from 'antd-mobile-demo-data';
import { hashHistory, browserHistory, Link } from 'react-router';

import { Picker, NavBar, List, Checkbox } from 'antd-mobile';
import enUs from 'antd-mobile/lib/date-picker/locale/en_US';


import MenuBar from "../components/MenuBar";
const CheckboxItem = Checkbox.CheckboxItem;

// 如果不是使用 List.Item 作为 children
const CustomChildren = (props) => {
  return (
    <div
      onClick={props.onClick}
      style={{ backgroundColor: '#fff', height: '0.9rem', lineHeight: '0.9rem', padding: '0 0.3rem' }}
    >
      {props.children}
      <span style={{ float: 'right' }}>{props.extra}</span>
    </div>
  );
};

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pickerValue: [],
      // pickerValue: ['340000', '340800', '340824']
      // dpValue: moment(),
      dpValue: null,
    };
  }
  componentDidMount() {
    // this.props.changeTitle('Stage 3');
  }
  render() {
    const { getFieldProps } = this.props.form;
    const { pickerValue, dpValue } = this.state;
    return (<div>

      <MenuBar tab='team'></MenuBar>
      Team</div>);
  }
}

export default createForm()(Demo);
