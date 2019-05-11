import {browserHistory} from 'react-router';
import {routerMiddleware} from 'react-router-redux';
import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import {enableBatching} from 'redux-batched-actions';
import configureChangeListeners from './changeListeners';
import configureRealtimeListeners from './realtimeListeners';
import configureAnalytics from './analytics';

const configureStore = (isTesting) => {
  let middlewares = [thunk];
  middlewares.push(routerMiddleware(browserHistory));
  // only add logger when in dev mode
  if (process.env.NODE_ENV === 'development') {
    const createLogger = require('redux-logger');
    middlewares.push(createLogger());
  }
  const store = createStore(
    enableBatching(rootReducer),
    compose(
      applyMiddleware(...middlewares),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );
  configureChangeListeners(store);
  if (!isTesting) {
    configureRealtimeListeners(store);
    configureAnalytics(store);
  }
  return store;
};

export default configureStore;
