import './common/reset.scss';
import 'babel-runtime/regenerator/runtime.js';
import './util/jquery-qrcode.js';
import './util/jquery-qrdecode.js';

import React, {Component} from 'react';
import { render } from 'react-dom';
import RUI from 'react-component-lib';

import { createStore, applyMiddleware, combineReducers, compose} from 'redux';
import { Provider, connect } from 'react-redux';
import thunk from 'redux-thunk';
import { browserHistory, hashHistory} from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import Routes from './routes.jsx';
import reducers from './reducers/index.jsx';

import 'http://cdn.bootcss.com/codemirror/5.21.0/codemirror.css';
import 'http://cdn.bootcss.com/codemirror/5.21.0/codemirror.js';
import 'http://cdn.bootcss.com/codemirror/5.21.0/mode/xml/xml.js';

const store = createStore(
    reducers, {},
    compose(
        applyMiddleware(thunk)
    )
);

const history = syncHistoryWithStore(hashHistory, store);

render(<Provider store={store}>
    <Routes history={history} store={store} />
</Provider>, document.getElementById('wrapper'));
