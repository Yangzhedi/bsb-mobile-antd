import React from "react";
import {ListView, SegmentedControl} from "antd-mobile";
import MenuBar from "../components/MenuBar";

let Global = require('../Components/Global');
const data = [
  {
    img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
    title: '开始时间：2017/05/05 12:05',
    des: '第十届大腿杯总决赛',
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
    title: '开始时间：2017/05/05 12:05',
    des: '第十届大腿杯总决赛',
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
    title: '开始时间：2017/05/05 12:05',
    des: '第十届大腿杯总决赛',
  },
];
let index = data.length - 1;

const NUM_ROWS = 20;
let pageIndex = 0;

export default class Tournament extends React.Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.genData = (pIndex = 0) => {
                const dataBlob = {};
                for (let i = 0; i < NUM_ROWS; i++) {
                const ii = (pIndex * NUM_ROWS) + i;
                dataBlob[`${ii}`] = `row - ${ii}`;
            }
            return dataBlob;
        };

        this.state = {
          dataSource: dataSource.cloneWithRows({}),
          isLoading: true,
        };
    }
    componentDidMount() {
        // this.props.changeTitle('Stage 2');
        setTimeout(() => {
            this.rData = this.genData();
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                isLoading: false,
            });
        }, 600);
    }
    // 触底加载
    onEndReached = (event) => {
        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false
        if (this.state.isLoading && !this.state.hasMore) {
            return;
        }
        console.log('reach end', event);
        this.setState({ isLoading: true });
        setTimeout(() => {
            this.rData = { ...this.rData, ...this.genData(++pageIndex) };
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                isLoading: false,
            });
        }, 1000);
    }



    onChange = (e) => {
        console.log(`selectedIndex:${e.nativeEvent.selectedSegmentIndex}`);
    }
    onValueChange = (value) => {
        console.log(value);
    }
    render() {
        
        console.log(Global)
        const separator = (sectionID, rowID) => (
            <div key={`${sectionID}-${rowID}`}
                style={{
                    backgroundColor: '#F5F5F9',
                    height: 8,
                    borderTop: '1px solid #ECECED',
                    borderBottom: '1px solid #ECECED',
                }}
            />
        );
        const row = (rowData, sectionID, rowID) => {
            if (index < 0) {
                index = data.length - 1;
            }
            const obj = data[index--]; 
            return (
                <div key={rowID} className="row">
                    <div style={{ display: '-webkit-box', display: 'flex', padding: '0.3rem 0' }}>
                    <img style={{ height: '1.28rem', marginRight: '0.3rem' }} src={obj.img} alt="icon" />
                    <div className="row-text">
                        <div style={{ marginBottom: '0.16rem', fontWeight: 'bold' }}>{obj.des}</div>
                        <div><span style={{ fontSize: '0.6rem', color: '#FF6E27' }}>{rowID}</span>¥</div>
                    </div>
                    
                </div>
                <div className="row-title">{obj.title}</div>
            </div>);
        };
        return (
            <div style={{background:'url(/img/bg.png)'}}>
                <MenuBar tab='tournament'></MenuBar>
                <SegmentedControl class="segmented-control"
                    tintColor={'#cb6228'}
                    values={['进行中', '已结束']}
                    style={{ height: '0.8rem', width: '5rem', margin:'0 auto' }}
                    onChange={this.onChange}
                    onValueChange={this.onValueChange}
                />
                <ListView ref="lv"
                    dataSource={this.state.dataSource}
                    // renderHeader={() => <span>header</span>}
                    renderFooter={() => (<div style={{ paddingBottom: 130,paddingTop: 40, textAlign: 'center' }}>
                      {this.state.isLoading ? 'Loading...' : 'Loaded'}
                    </div>)}
                    renderRow={row}
                    renderSeparator={separator}
                    className="am-list"
                    pageSize={4}
                    useBodyScroll
                    onScroll={() => { console.log('scroll'); }}
                    scrollRenderAheadDistance={500}
                    scrollEventThrottle={200}
                    onEndReached={this.onEndReached}
                    onEndReachedThreshold={10}
                />
            </div>
        );
    }
}
