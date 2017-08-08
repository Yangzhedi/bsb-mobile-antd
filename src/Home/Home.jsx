import React from "react";
import {RefreshControl, ListView, Carousel, SwipeAction, Button, NavBar, SearchBar} from "antd-mobile";
import MenuBar from "../components/MenuBar";
// var dataRepository=new DataRepository(FLAG_STORAGE.flag_trending)

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.initData = [];
        for (let i = 0; i < 20; i++) {
            this.initData.push(`r${i}`);
        }
        this.state = {
            dataSource: dataSource.cloneWithRows(this.initData),
            refreshing: false,
            isLoading: false
        };
    }

    componentDidMount() {
        // this.props.changeTitle('Stage 1');
    }

    onSubmit(value){
        console.log(value);
        const page= {
            page: 0,
            size: 10,
            sort:["id,asc"]
        };
        const data= {
            name:value
        };
        const url = 'http://localhost:8080/api/bsb-tournaments/viewer/query/tournament'
        fetch(url,{
            method:'POST',
            mode: "no-cors",
            headers:{
                'Accept':'application/json',
                'Content-type':'application/json'
            },
            body:JSON.stringify(page)
        })
        .then(response => response.json())
        .then(result => {
            console.log(result)
        })
        .catch(error => {
            // this.setState{...}
        })
    }
    render() {
        const page = "<strong>test</strong>";
        return (
            <div>
                <MenuBar tab='home'></MenuBar>
                Home-
                <div dangerouslySetInnerHTML={{__html: page}}></div>
                <SearchBar placeholder="搜索" onSubmit={this.onSubmit}/>
                <iframe  width='100%' height='100%' style={{border:'none',minHeight:'4rem'}} src="https://www.bisaibang.com/widget/tournament/bracket/3235"></iframe>
                <div style={{height:'1.5rem'}}></div>
            </div>
        );
    }
}


