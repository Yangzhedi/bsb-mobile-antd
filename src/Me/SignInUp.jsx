import React from "react";
import {hashHistory} from "react-router";
import {Button, Tabs, NavBar, InputItem} from "antd-mobile";
import { createForm } from 'rc-form';
var marked = require('marked');

class SignInUpDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '登录注册',
            hasError: false,
            value: ''
        };
        this.onChange = this.onChange.bind(this);
    }
    componentDidMount() {
        // this.props.changeTitle('Stage 2');
    }
    componentWillMount(){

    }
    onErrorClick(){
        if (this.state.hasError) {
            Toast.info('Please enter 11 digits');
        }
    }
    onChange(value){
        if (value.replace(/\s/g, '').length < 11) {
            this.setState({
                hasError: true
            });
        } else {
            this.setState({
                hasError: false
            });
        }
        this.setState({
            value: value
        });
    }
    render() {
        const { getFieldProps } = this.props.form;
        return (
            <div>
                <NavBar mode="dark" style={{backgroundColor:'#19191d',color:'white'}}
                        onLeftClick={() => {
                        hashHistory.goBack();
                        console.log(hashHistory)
                    }}
                        rightContent={<b>...</b>}
                >
                    {this.state.title}
                </NavBar>
                <InputItem
                    type="phone"
                    placeholder="input your phone"
                    error={this.state.hasError}
                    onErrorClick={this.onErrorClick}
                    onChange={this.onChange}
                    value={this.state.value}
                >手机号码</InputItem>
                <InputItem
                    {...getFieldProps('password')}
                    type="password"
                    placeholder="****"
                >密码</InputItem>
            </div>
        );
    }
}
export default createForm()(SignInUpDemo);