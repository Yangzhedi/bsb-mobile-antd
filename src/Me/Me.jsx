import React from "react";
import {hashHistory, Link} from "react-router";
import {Button, Tabs, Flex, TextareaItem, ActivityIndicator} from "antd-mobile";
import MenuBar from "../components/MenuBar";
let Global = require('../components/Global');
import { getCookie } from '../components/Cookie';
import  HTTPUtil  from '../components/HTTPUtil';

const TabPane = Tabs.TabPane;
var marked = require('marked');

export default class Me extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            loading: true
        };
        this.dataIsReady = this.dataIsReady.bind(this)

        this.getCurrentInfo = this.getCurrentInfo.bind(this);
        this.getCurrentCount = this.getCurrentCount.bind(this);
    }
    componentDidMount() {
        // this.props.changeTitle('Stage 2');
    }
    componentWillMount(){
        if(Global.user == undefined){
            this.getCurrentCount(getCookie('id_token'))
            console.log(getCookie('id_token'))
        }else{
            this.setState({
                loading:false
            })
        }
    }
     getCurrentCount(token){
        const url = 'http://localhost:8080/api/account';
        var this_ = this;
        // console.log(token)

        HTTPUtil.get(url, null).then((result)=>{
            if(Global.user == undefined){
                Global.user = result;
                console.log(Global);
                this_.getCurrentInfo(token)
                console.log('成功登陆,第一次初始化Global')
            }
            console.log('成功登陆')
        })

        // new Promise((resolve,reject)=>{
        //     fetch(url,{
        //             headers:{
        //                 'Authorization':'Bearer '+token
        //             }
        //         })
        //         .then((response)=>response.json())
        //         .then((result)=>{
        //             if(Global.user == undefined){
        //                 Global.user = result;
        //                 console.log(Global);
        //                 this_.getCurrentInfo(token)
        //                 console.log('成功登陆,第一次初始化Global')
        //             }
        //             console.log('成功登陆')
        //         })
        //         .then((result)=>{
        //             resolve(result);
        //         })
        //         .catch(error=>{
        //             reject(error);
        //         })
        // })
    }
    getCurrentInfo(token){
        const url =  'http://localhost:8080/api/bsb-person-infos';
        var this_ = this;
        // console.log(token)
        new Promise((resolve,reject)=>{
            fetch(url,{
                headers:{
                    'Authorization':'Bearer '+token
                }
            })
            .then((response)=>response.json())
            .then((result)=>{
                Global.person = result;
                // console.log(result);
                // console.log('getCurrentInfo')
                this_.setState({
                    loading:false
                })
            })
            .then((result)=>{
                resolve(result);
            })
            .catch(error=>{
                reject(error);
            })
        })
    }
    dataIsReady(bool){
        console.log(bool)
        this.setState({
            loading:bool
        })
    }
    render() {
        console.log('loading is    '+this.state.loading)
        return (
            this.state.loading ? (
                <div>
                    <MenuBar tab='me'></MenuBar>
                    <div className="align" style={{justifyContent:'center',display: 'flex',marginTop:'3rem'}} ><ActivityIndicator text="Loading..." animating /></div>
                <Button type="primary" inline size="small" 
                    onClick={() => {
                        console.log(hashHistory.getCurrentLocation().pathname)
                        hashHistory.push('signinup')
                    }}
                >登录</Button>
                </div>
                ):(
            <div>
                <MenuBar tab='me' dataIsReady={this.dataIsReady}></MenuBar>
                <Button type="primary" inline size="small" 
                    onClick={() => {
                        console.log(hashHistory.getCurrentLocation().pathname)
                        hashHistory.push('signinup')
                    }}
                >登录</Button>
                   
                <Button type="primary" inline size="small"
                        onClick={() => {
                        hashHistory.push('info')
                    }}
                >info</Button>
                <Flex>
                    <Flex.Item>
                        <img style={{width:'2rem',height:'2rem'}} src={Global.person.avatarUrl}/>
                    </Flex.Item>
                    <Flex.Item>{Global.person.name}</Flex.Item>
                </Flex>
            </div>)
        );
    }
}