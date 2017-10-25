import React from "react";
import {SearchBar, Tabs, Steps, Icon, ListView, SegmentedControl} from "antd-mobile";
import MenuBar from "../components/MenuBar";
import  HTTPUtil  from '../components/HTTPUtil';

let Global = require('../components/Global');
import { setCookie } from '../components/Cookie';
const TabPane = Tabs.TabPane;


const data = [ ];
let index = 0;

const NUM_ROWS = 2;
let pageIndex = 0;

export default class News extends React.Component {
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
            console.log(this.rData)
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                isLoading: false,
            });
        }, 600);

        const url = '/ms-article/get-all-article';
        var this_ = this;

        HTTPUtil.ajax({
            method: 'GET',
            url: url,
            data:{page:pageIndex,size:NUM_ROWS,sort:'id,asc'},
            success: function (response) {
                // console.log(JSON.parse(response))
                // data = data.concat(JSON.parse(response).content);
                index = JSON.parse(response).content.length - 1
                this_.setState({
                    data:JSON.parse(response).content,
                    ok:'true'
                })
            },
            error: function (response) {
                console.log(response)
            }
        });


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
        const url = '/ms-article/get-all-article';
        var this_ = this;
        var resObj = null;
        HTTPUtil.ajax({
            method: 'GET',
            url: url,
            data:{page:++pageIndex,size:NUM_ROWS,sort:'id,asc'},
            success: function (response) {
                // console.log(response)
                resObj = JSON.parse(response);
                // data = data.concat(JSON.parse(response).content);
                this_.setState({
                    data:this_.state.data.concat(JSON.parse(response).content),
                    ok:'true'
                })
                // console.log(resObj)
                // index = this_.state.data.length + resObj.content.length - 1;

                console.log(this_.state.data.length,resObj.totalElements)
                if(this_.state.data.length >= resObj.totalElements) return;
                this_.rData = { ...this_.rData, ...this_.genData(pageIndex) };
                // console.log(this_.rData)
                this_.setState({
                    dataSource: this_.state.dataSource.cloneWithRows(this_.rData),
                    isLoading: false,
                });
            },
            error: function (response) {
                console.log(response)
            }
        });
        
    }
    onValueChange = (value) => {
        console.log(value);
    }
    callback(key) {
        console.log('onChange', key);
    }

    handleTabClick(key) {
        console.log('onTabClick', key);
        console.log(setCookie)
    }

    render() {
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
            console.log(rowData)
            if (index < 0) {
                index = this.state.data.length - 1;
            }
            const obj = this.state.data[index--]; 
            // console.log(this.state.data,index)
            return (
                <div key={rowID} className="row" style={{ height: '3rem'}}>
                    <div style={{ display: '-webkit-box', display: 'flex', padding: '0.7rem 0' }}>
                    <div className="row-text">
                        <div style={{ marginBottom: '0.16rem', fontWeight: 'bold' }}>{obj.content}</div>
                        <div><span style={{ fontSize: '0.6rem', color: '#FF6E27' }}>{rowID}</span>¥</div>
                        <div>ID:<span style={{ fontSize: '0.6rem', color: '#FF6E27' }}>{obj.id}</span></div>
                    </div>
                    
                </div>
                <div className="row-title">{obj.content}</div>
            </div>);
        };
        console.log(this.state.data)
        return (
            <div style={{background:'url(/img/bg.png)'}}>
                <MenuBar tab='news'></MenuBar>
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
