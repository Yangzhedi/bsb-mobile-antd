import React from "react";
import {RefreshControl, ListView, Carousel, SwipeAction, Button, NavBar} from "antd-mobile";
import MenuBar from "../components/MenuBar";

class Carou extends React.Component {
    state = {
        data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
        initialHeight: 400,
    }

    render() {
        return (
            <Carousel infinite>
                {this.state.data.map(ii => (
                    <a key={ii}
                       style={{
              display: 'block', height: this.state.initialHeight,
              background: `url(https://zos.alipayobjects.com/rmsportal/${ii || 'QcWDkUhvYIVEcvtosxMF'}.png) no-repeat`,
              backgroundSize: 'cover'
            }}
                    />
                ))}
            </Carousel>
        );
    }
}

let pageIndex = 0;

export default class Demo extends React.Component {
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
            isLoading: false,
        };
    }

    componentDidMount() {
        // this.props.changeTitle('Stage 1');
    }

    render() {
        const page = "<strong>test</strong>";
        return (
            <div>
                <MenuBar tab='home'></MenuBar>
                Home<div dangerouslySetInnerHTML={{__html: page}} ></div>
            </div>
        );
    }
}


