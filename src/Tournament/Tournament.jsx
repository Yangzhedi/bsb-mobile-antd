import React from "react";
import {SearchBar, Tabs, SegmentedControl} from "antd-mobile";
import MenuBar from "../components/MenuBar";

const TabPane = Tabs.TabPane;

export default class Tournament extends React.Component {
    componentDidMount() {
        // this.props.changeTitle('Stage 2');
    }
    onChange = (e) => {
        console.log(`selectedIndex:${e.nativeEvent.selectedSegmentIndex}`);
    }
    onValueChange = (value) => {
        console.log(value);
    }
    render() {
        return (
            <div style={{backgroundColor:'#eee'}}>
                <MenuBar tab='tournament'></MenuBar>
                Tournament
                <SegmentedControl class="segmented-control"
                    tintColor={'#cb6228'}
                    values={['进行中', '已结束']}
                    style={{ height: '0.8rem', width: '5rem', margin:'0 auto' }}
                    onChange={this.onChange}
                    onValueChange={this.onValueChange}
                />
            </div>
        );
    }
}
