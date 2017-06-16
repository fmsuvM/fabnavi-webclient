import React from 'react';
import ReactDOM, {render} from 'react-dom';
import 'rxjs';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import {createEpicMiddleware} from 'redux-observable';
import Debug from 'debug';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {HashRouter} from 'react-router-dom';

import ProjectList from './ProjectList';
import ProjectManager from './ProjectManager';
import Player from './Player';
import CreateProject from './CreateProject';
import EditProject from './EditProject';
import ProjectDetail from './ProjectDetail';

import reducer from '../reducers/index';
import adjustor from '../middleware/adjustor';
import rootEpics from '../middleware/epics/index';
import {handleKeyDown} from '../actions/KeyActionCreator';
import WebAPIUtils from '../utils/WebAPIUtils';
import {changeFrame} from "../actions/frame";

import '../stylesheets/index.scss';

const debug = Debug('fabnavi:jsx:FabnaviApp');

// `DOMContentLoaded` 以下で発火
window.api = WebAPIUtils;
window.addEventListener('DOMContentLoaded', () => {
    debug('======> Mount App');
    const url = window.location.href; // 自身のURL
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    // reducerで状態管理
    // reducerは現在の状態stateと受け取ったActionを引数にとり，新しい状態を返す関数
    const store = createStore(reducer, composeEnhancers(applyMiddleware(rootEpics, adjustor)));

    const onEnterFrame = frame => (nextState, replace, callback) => {
        store.dispatch(changeFrame(frame));
        callback();
    };

    window.store = store;
    if (isAuthWindow(url)) {
        window.opener.postMessage(JSON.stringify(parseAuthInfo(url)), window.location.origin);
        window.close();
        return;
    }
    api.init(store);
    ReactDOM.render(
        // providerで囲む
        // react router でpage遷移
        // `IndexRoute` の指定先がdefault page
        <Provider store={store}>
        <HashRouter history={browserHistory}>
          <div>
            <Route path="/" onEnter={onEnterFrame('manager')} render={() => (
              <ProjectManager>
                <Route component={ProjectList} path="/" exact />
                <Route component={ProjectList} path="myprojects"/>
                <Route component={CreateProject} path="create"/>
                <Route component={EditProject} path="edit/:projectId"/>
                <Route component={ProjectDetail} path="detail/:projectId"/>
              </ProjectManager>
              )} />
            <Route components={Player} path="/play/:projectId" onEnter={onEnterFrame('player')}/>
            </div>
        </HashRouter>
    </Provider>, document.querySelector('#app'));
    window.addEventListener('keydown', handleKeyDown(store));
});

function isAuthWindow(url) {
    return url.includes('uid') && url.includes('client_id') && url.includes('auth_token');
}

function parseAuthInfo(url) {
    return {
        'Access-Token': url.match(/auth_token=([a-zA-Z0-9\-\_]*)/)[1],
        'Uid': url.match(/uid=([a-zA-Z0-9\-\_]*)/)[1],
        'Client': url.match(/client_id=([a-zA-Z0-9\-\_]*)/)[1]
    };
}
