import React from 'react';
import ReactDOM from 'react-dom';
import 'rxjs';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import Debug from 'debug';
import { Route, IndexRoute } from 'react-router';
import { HashRouter } from 'react-router-dom';

import ProjectList from './ProjectList';
import ProjectManager from './ProjectManager';
import Player from './Player';
import CreateProject from './CreateProject';
import EditProject from './EditProject';
import ProjectDetail from './ProjectDetail';

import reducer from '../reducers/index';
import adjustor from '../middleware/adjustor';
import rootEpics from '../middleware/epics/index';
import { handleKeyDown } from '../actions/KeyActionCreator';
import WebAPIUtils from '../utils/WebAPIUtils';
import { changeFrame } from '../actions/frame';

import '../stylesheets/application/application.scss';
const debug = Debug('fabnavi:jsx:FabnaviApp');


window.api = WebAPIUtils;
window.addEventListener('DOMContentLoaded', () => {
  debug('======> Mount App');
  const url = window.location.href;
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(reducer,
    composeEnhancers(applyMiddleware(
      rootEpics,
      adjustor)));

  const onEnterFrame = frame => (nextState, replace, callback) => {
    store.dispatch(changeFrame(frame));
    callback();
  };

  window.store = store;
  if(isAuthWindow(url)) {
    window.opener.postMessage(JSON.stringify(parseAuthInfo(url)), window.location.origin);
    window.close();
    return;
  }
  api.init(store);
  ReactDOM.render(
    <Provider store={store}>
        <ProjectManager>
          <ProjectList />
          </ProjectManager>
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