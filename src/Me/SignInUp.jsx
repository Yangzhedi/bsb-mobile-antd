import React from "react";
import {browserHistory} from "react-router";
import {Button, Tabs, NavBar, InputItem} from "antd-mobile";
import { createForm } from 'rc-form';
var marked = require('marked');
let Global = require('../components/Global');

class SignInUpDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '登录注册',
            hasError: false,
            value: ''
        };
        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.getCurrentCount = this.getCurrentCount.bind(this);
    }
    componentDidMount() {
        // this.props.changeTitle('Stage 2');
    }
    componentWillMount(){

    }
    onClick(){
        const url = 'http://localhost:8080/api/authenticate';
        const data= {
            "password":"BsbV2",
            "rememberMe":true,
            "username":"admin"
        };
        var this_ = this;
        new Promise((resolve,reject)=>{
            fetch(url,{
                    method:'POST',
                    headers:{
                        'Accept':'application/json',
                        'Content-type':'application/json'
                    },
                    body:JSON.stringify(data)
                })
                .then((response)=>response.json())
                .then((result)=>{
                    // console.log(result.id_token);
                    this_.setCookie('id_token',result.id_token,365)
                    Global.userToken = result.id_token
                    this_.getCurrentCount(result.id_token)
                })
                .then((result)=>{
                    resolve(result);
                })
                .catch(error=>{
                    reject(error);
                })
        })
    }
    setCookie(c_name,value,expiredays){
        var exdate=new Date()
        exdate.setDate(exdate.getDate()+expiredays)
        document.cookie=c_name+ "=" +escape(value)+
        ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
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
                    browserHistory.push('me')
                })
                .then((result)=>{
                    resolve(result);
                })
                .catch(error=>{
                    reject(error);
                })
        })
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
                        browserHistory.goBack();
                        console.log(browserHistory)
                    }}
                        rightContent={<b>...</b>}
                >
                    {this.state.title}
                </NavBar>
                <InputItem
                    {...getFieldProps('inputtitle2')}
                    placeholder="title can be icon，image or text"
                >
                    <div style={{ backgroundImage: 'url(https://zos.alipayobjects.com/rmsportal/DfkJHaJGgMghpXdqNaKF.png)', backgroundSize: 'cover', height: '0.44rem', width: '0.44rem' }} />
                </InputItem>
                {/*<InputItem
                    type="phone"
                    placeholder="input your phone"
                    error={this.state.hasError}
                    onErrorClick={this.onErrorClick}
                    onChange={this.onChange}
                    value={this.state.value}
                >手机号码</InputItem>*/}
                <InputItem
                    {...getFieldProps('password')}
                    type="password"
                    placeholder="****"
                >密码</InputItem>
                <Button className="btn" type="primary" onClick={this.onClick}>登录</Button>
                <Button className="btn">注册</Button>
            </div>
        );
    }
}
export default createForm()(SignInUpDemo);