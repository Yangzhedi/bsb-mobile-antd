import React from "react";
import {hashHistory} from "react-router";
import {Button, Tabs, Steps, TextareaItem} from "antd-mobile";
import MenuBar from "../components/MenuBar";

const TabPane = Tabs.TabPane;
var marked = require('marked');

export default class Me extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
    }
    componentDidMount() {
        // this.props.changeTitle('Stage 2');
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
    render() {
        return (
            <div>
                <MenuBar tab='me'></MenuBar>
                Me
                <Button type="primary" inline size="small" 
                        onClick={() => {
                            hashHistory.push('signinup')
                        }}
                >登录</Button>
                <TextareaItem
                    title="标题"
                    placeholder="write ur markdown here"
                    data-seed=""
                    autoFocus
                    autoHeight
                    onChange = {(val)=>{
                        this.setState({
                            value:val
                        })
                    }}
                />
                <div dangerouslySetInnerHTML={{__html: marked(this.state.value)}}></div>
            </div>
        );
    }
}