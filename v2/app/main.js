import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, Redirect, browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import configureStore from './store';
import Dashboard from './containers/dashboard';
import Account from './containers/account';
import * as uiActions from './reducers/ui/ui-actions';

const store = configureStore();

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

const init = (p) => {
  store.dispatch(uiActions.set('location', p.location));
  store.dispatch(uiActions.set('locationParams', p.params));
};

ReactDOM.render(
  <Provider store={store}>
    <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
      <Route path="/v2/new" component={Dashboard} onEnter={init} />
      <Route path="/v2/dashboard" component={Dashboard} onEnter={init} />
      <Route path="/v2/dashboard/:project/:branch" component={Dashboard} onEnter={init} />
      <Route path="/v2/states/:project/:branch" component={Dashboard} onEnter={init} />
      <Route path="/v2/states/:project/:branch/:resolution/:testName" component={Dashboard} onEnter={init} />
      <Route path="/v2/states/:project/:branch/:resolution/:testName/:stateId" component={Dashboard} onEnter={init} />
      <Route path="/v2/account/:view" component={Account} onEnter={init} />
      <Redirect from="*" to="/v2/dashboard" />
    </Router>
  </Provider>,
  document.getElementById('root')
);
