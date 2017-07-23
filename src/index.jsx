import React from 'react';
import ReactDOM from 'react-dom';

// import 'antd-mobile/lib/button/style/index.css';
// import Button from 'antd-mobile/lib/button';

import { Router, Route, hashHistory, IndexRoute, Link } from 'react-router';

import MenuBar from './components/MenuBar';
import Home from './Home/Home';
import Tournament from './Tournament/Tournament';
import Team from './Team/Team';
import Station from './Station/Station';
import Me from './Me/Me';

import './index.less';

class Index extends React.Component {
  render() {
    return (
      <div className="body">
        <h1>Stages list</h1>
        <ul role="nav">
          <li><Link to="/s1">ListView + Carousel</Link></li>
          <li><Link to="/s2">Tabs + ...</Link></li>
          <li><Link to="/s3">Form + ...</Link></li>
        </ul>
      </div>
    );
  }
}

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/">
      <IndexRoute component={Home} />
      <Route path="home" component={Home} />
      <Route path="tournament" component={Tournament} />
      <Route path="team" component={Team} />
      <Route path="station" component={Station} />
      <Route path="me" component={Me} />
    </Route>
  </Router>
, document.getElementById('example'));
