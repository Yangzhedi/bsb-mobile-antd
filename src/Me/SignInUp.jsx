import React from "react";
import {hashHistory} from "react-router";
import {Button, Tabs, NavBar, InputItem} from "antd-mobile";
import { createForm } from 'rc-form';
var marked = require('marked');
let Global = require('../components/Global');
import  HTTPUtil  from '../components/HTTPUtil';
import { getCookie } from '../components/Cookie';
var id_token = getCookie('id_token')


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
        this.getCurrentInfo = this.getCurrentInfo.bind(this);
        this.isHaveToken = this.isHaveToken.bind(this);
    }
    componentDidMount() {
        // this.props.changeTitle('Stage 2');
    }
    componentWillMount(){

    }
    isHaveToken(){
        if(id_token){
            return {
                'Authorization':'Bearer '+ id_token
            }
        }else{
            console.log('进来了12321321')
            return{
                'Accept':'application/json',
                'Content-type':'application/json'
            }
        }
    }
    onClick(){
        const url = '/authenticate';
        const data= {
            "password":"12345",
            "rememberMe":true,
            "username":"13120024922"
        };
        var this_ = this;
        const headers = this.isHaveToken();
        HTTPUtil.post(url, data, headers).then((result)=>{
            // console.log(result.id_token);
            this_.setCookie('id_token',result.id_token,5)
            Global.userToken = result.id_token
            this_.getCurrentCount(result.id_token)
        })
    }
    setCookie(c_name,value,expiredays){
        var exdate=new Date()
        exdate.setDate(exdate.getDate()+expiredays)
        document.cookie=c_name+ "=" +escape(value)+
        ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
    }

    getCurrentCount(token){
        const url = '/account';
        var this_ = this;
        const headers = {
            'Authorization':'Bearer '+ token
        }
        HTTPUtil.get(url, null, headers).then((result)=>{
            Global.user = result;
            console.log(result);
            this_.getCurrentInfo(token)
            console.log('成功登陆')
            
            console.log(hashHistory)
        })
    }

    getCurrentInfo(token){
        const url =  '/bsb-person-infos';
        var this_ = this;
        const headers = {
            'Authorization':'Bearer '+ token
        };
        HTTPUtil.get(url, null, headers).then((result)=>{
            Global.person = result;
            console.log(result);
            setTimeout(function(){
                hashHistory.push('me')
            },2000);
            console.log('getCurrentInfo')
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
                        hashHistory.goBack();
                        console.log(hashHistory)
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