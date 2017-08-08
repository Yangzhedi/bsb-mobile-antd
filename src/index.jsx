import React from 'react';
import ReactDOM from 'react-dom';

// import 'antd-mobile/lib/button/style/index.css';
// import Button from 'antd-mobile/lib/button';

import { Router, Route, hashHistory, IndexRoute, Link, browserHistory } from 'react-router';

import MenuBar from './components/MenuBar';
import Home from './Home/Home';
import Tournament from './Tournament/Tournament';
import Team from './Team/Team';
import Station from './Station/Station';
import Me from './Me/Me';
import Info from './Me/Info';
import SignInUp from './Me/SignInUp';

import './index.less';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/">
      <IndexRoute component={Home} />
      <Route path="home" component={Home} />
      <Route path="tournament" component={Tournament} />
      <Route path="team" component={Team} />
      <Route path="station" component={Station} />
      <Route path="me" component={Me} />
        <Route path="signinup" component={SignInUp} />
        <Route path="info" component={Info} />
    </Route>
  </Router>
, document.getElementById('example'));
