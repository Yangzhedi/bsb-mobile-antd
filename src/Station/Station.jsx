import React from "react";
import {SearchBar, Tabs, Steps, Icon, WhiteSpace} from "antd-mobile";
import MenuBar from "../components/MenuBar";

let Global = require('../Components/Global');
const TabPane = Tabs.TabPane;

export default class Station extends React.Component {
    componentDidMount() {
        // this.props.changeTitle('Stage 2');
    }

    callback(key) {
        console.log('onChange', key);
    }

    handleTabClick(key) {
        console.log('onTabClick', key);
    }

    render() {
        console.log(Global)
        return (
            <div>
                <MenuBar tab='station'></MenuBar>
                Station
                <WhiteSpace />
                <Tabs defaultActiveKey="1" onChange={this.callback} onTabClick={this.handleTabClick}>
                    <TabPane tab="小站赛事" key="1">
                        <div
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '5rem', backgroundColor: '#fff' }}>
                            Content of First Tab
                        </div>
                    </TabPane>
                    <TabPane tab={<div><Icon type={'cross-circle-o'} />讨论群</div>} key="2">
                        <div
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '5rem', backgroundColor: '#fff' }}>
                            Content of Second Tab
                        </div>
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}
