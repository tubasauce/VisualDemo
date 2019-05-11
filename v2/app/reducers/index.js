import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import ui from './ui/ui';
import * as request from './request/request';

const rootReducer = combineReducers({
  routing: routerReducer,
  ui,
  account: request.generateReducer('account'),
  usage: request.generateReducer('usage'),
  subscriptions: request.generateReducer('subscriptions'),
  integration: request.generateReducer('integration'),
  accounts: request.generateReducer('accounts'),
  activity: request.generateReducer('activity'),
  project: request.generateReducer('project', {status: 'loading'}),
  branches: request.generateReducer('branches', {status: 'loading'}),
  builds: request.generateReducer('builds', {status: 'loading'}),
  states: request.generateReducer('states'),
  state: request.generateReducer('state'),
  history: request.generateReducer('history')
});
export default rootReducer;
