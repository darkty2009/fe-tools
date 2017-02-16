import React, {Component, PropTypes} from 'react';
import { Router, Route, IndexRoute} from 'react-router';

import Layout from './common/layout.jsx';

import pages from './pages/index.jsx';

class Routers extends Component {
    static childContextTypes = {
        store:PropTypes.func
    }

    getChildContext() {
        return {
            store:this.props.store
        };
    }

    render() {
        return <Router history={this.props.history}>
            <Route path={"/"} component={Layout}>
                {pages.map((page, i)=>{
                    return <Route key={i} path={page} getComponent={(nextState, callback)=>{
                        require.ensure([], function(require) {
                            var Comp = require('./pages/' + page + '.jsx');
                            callback(null, Comp.default);
                        });
                    }} />
                })}
            </Route>
        </Router>
    }
}

export default Routers;