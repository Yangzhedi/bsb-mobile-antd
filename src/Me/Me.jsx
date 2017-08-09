import React from "react";
import {hashHistory, Link} from "react-router";
import {Button, Tabs, Flex, TextareaItem, ActivityIndicator} from "antd-mobile";
import MenuBar from "../components/MenuBar";
let Global = require('../components/Global');


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
    }
    componentDidMount() {
        // this.props.changeTitle('Stage 2');
    }
    componentWillMount(){
        
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
                    <MenuBar tab='me' dataIsReady={this.dataIsReady}></MenuBar>
                    <div className="align" style={{justifyContent:'center',display: 'flex',marginTop:'3rem'}} ><ActivityIndicator text="Loading..." animating /></div>
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