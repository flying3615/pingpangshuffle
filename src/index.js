import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'
import Navigator from './components/Navigator'

import Play from './container/Play'
import Register from './container/Register'
import Statistic from './container/Statistic'
import NotFound from './util/404';

const routing = (
    <Router>
        <Navigator />

        <Switch>
            <Route exact path="/" component={App} />
            <Route path="/play" component={Play} />
            <Route path="/register" component={Register} />
            <Route path="/statistic" component={Statistic} />
            <Route component={NotFound} />
        </Switch>
    </Router>
)


ReactDOM.render(routing, document.getElementById('root'));

