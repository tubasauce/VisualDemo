import React from 'react';
import {Provider} from 'react-redux';
import {Router, Route, Redirect, browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import configureStore from '../../store';
import { storiesOf } from '@storybook/react';
import Screener, {Steps} from 'screener-storybook/src/screener';
import Dashboard from '../dashboard';
import * as page from './page-objects';
import './api-stubs';
import * as uiActions from '../../reducers/ui/ui-actions';

// init
const store = configureStore(true);

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

const init = (p) => {
  store.dispatch(uiActions.set('location', p.location));
  store.dispatch(uiActions.set('locationParams', p.params));
};

storiesOf('Container/Dashboard', module)
  .add('wizard flow', () => {
    const steps = new Steps()
      .click(page.dashboard.newProject)
      .snapshot('Step 1')
      .click(page.wizard.next)
      .snapshot('Step 2')
      .click(page.wizard.next)
      .snapshot('Step 2 Validation')
      .setValue(page.wizard.projectRepo, 'test/project-repo')
      .click(page.wizard.next)
      .snapshot('Step 3')
      .click(page.wizard.next)
      .snapshot('Step 4')
      .click(page.wizard.next)
      .snapshot('Step 5')
      .click(page.wizard.next)
      .snapshot('Step 6')
      .end();
    return (
      <Screener steps={steps}>
        <Provider store={store}>
          <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
            <Route path="/v2/new" component={Dashboard} onEnter={init} />
            <Route path="/v2/dashboard" component={Dashboard} onEnter={init} />
            <Route path="/v2/dashboard/:project/:branch" component={Dashboard} onEnter={init} />
            <Route path="/v2/states/:project/:branch" component={Dashboard} onEnter={init} />
            <Route path="/v2/states/:project/:branch/:resolution/:testName" component={Dashboard} onEnter={init} />
            <Route path="/v2/states/:project/:branch/:resolution/:testName/:stateId" component={Dashboard} onEnter={init} />
            <Redirect from="*" to="/v2/dashboard" />
          </Router>
        </Provider>
      </Screener>
    );
  })
  .add('review flow', () => {
    const steps = new Steps()
      .click(page.dashboard.review)
      .snapshot('Open Review')
      .click(page.stateList.firstState)
      .snapshot('Select State')
      .click(page.stateDetail.statusToggle)
      .click(page.stateDetail.statusAccept)
      .snapshot('Accept State')
      .click(page.stateDetail.next)
      .snapshot('Next State')
      .click(page.stateDetail.close)
      .snapshot('State List')
      .click(page.stateList.acceptAll)
      .snapshot('Accept All Dialog')
      .click(page.stateList.acceptAllConfirm)
      .snapshot('All Accepted')
      .click(page.stateList.selectAll)
      .snapshot('Select All States')
      .end();
    return (
      <Screener steps={steps}>
        <Provider store={store}>
          <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
            <Route path="/v2/new" component={Dashboard} onEnter={init} />
            <Route path="/v2/dashboard" component={Dashboard} onEnter={init} />
            <Route path="/v2/dashboard/:project/:branch" component={Dashboard} onEnter={init} />
            <Route path="/v2/states/:project/:branch" component={Dashboard} onEnter={init} />
            <Route path="/v2/states/:project/:branch/:resolution/:testName" component={Dashboard} onEnter={init} />
            <Route path="/v2/states/:project/:branch/:resolution/:testName/:stateId" component={Dashboard} onEnter={init} />
            <Redirect from="*" to="/v2/dashboard" />
          </Router>
        </Provider>
      </Screener>
    );
  });
