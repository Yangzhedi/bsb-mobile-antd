import React from "react";
import {createForm} from "rc-form";
import {Picker, NavBar, List, Checkbox, Button} from "antd-mobile";
import MenuBar from "../components/MenuBar"; // moment.min ~= 48kb
const CheckboxItem = Checkbox.CheckboxItem;
import  HTTPUtil  from '../components/HTTPUtil';
let Global = require('../components/Global');

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

class Team extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pickerValue: [],
            // pickerValue: ['340000', '340800', '340824']
            // dpValue: moment(),
            dpValue: null,
            data: null,
            ok:'false'
        };
        this.onClick = this.onClick.bind(this)
    }

    componentDidMount() {
        // this.props.changeTitle('Stage 3');
    }
    onClick(){
        const url = '/bsb-tournaments/viewer/3';
        var this_ = this;
        // new Promise((resolve,reject)=>{
        //     fetch(url)
        //         .then((response)=>response.json())
        //         .then((result)=>{
                    // console.log(result)
                    // this_.setState({
                    //     data:result
                    // })
        //         })
        //         .then((result)=>{
        //             resolve(result);
        //         })
        //         .catch(error=>{
        //             reject(error);
        //         })
        // })


        HTTPUtil.ajax({
            method: 'GET',
            url: url,
            success: function (response) {
                console.log(response)
                this_.setState({
                    data:response.json,
                    ok:'true'
                })
            }
        });
    }
    render() {
        const {getFieldProps} = this.props.form;
        const {pickerValue, dpValue} = this.state;
        console.log(Global);

        return (
            <div>
                <MenuBar tab='team'></MenuBar>
                Team
                <Button type="primary" inline size="small" 
                        onClick={this.onClick}
                >GET</Button>
                <div>{this.state.ok}</div>
            </div>
        );
    }
}

export default createForm()(Team);
