import React from "react";
import {createForm} from "rc-form";
import {Picker, NavBar, List, Checkbox, Button} from "antd-mobile";
import MenuBar from "../components/MenuBar"; // moment.min ~= 48kb
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

class Team extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pickerValue: [],
            // pickerValue: ['340000', '340800', '340824']
            // dpValue: moment(),
            dpValue: null,
            data: null
        };
        this.onClick = this.onClick.bind(this)
    }

    componentDidMount() {
        // this.props.changeTitle('Stage 3');
    }
    onClick(){

        const url = 'http://localhost:8080/api/bsb-tournaments/viewer/3';
       
        var this_ = this;
        new Promise((resolve,reject)=>{
            fetch(url)
                .then((response)=>response.json())
                .then((result)=>{
                    console.log(result)
                    this_.setState({
                        data:result
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
    render() {
        const {getFieldProps} = this.props.form;
        const {pickerValue, dpValue} = this.state;
        console.log(this.state.data)
        return (
            <div>
                <MenuBar tab='team'></MenuBar>
                Team
                <Button type="primary" inline size="small" 
                        onClick={this.onClick}
                >GET</Button>
            </div>
        );
    }
}

export default createForm()(Team);
