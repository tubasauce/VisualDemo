import {expect} from 'chai';
import * as activityActions from '../../v2/app/reducers/activity/activity-actions';
import * as request from '../../v2/app/reducers/request/request';

const activityReducer = request.generateReducer('activity');
const projectReducer  = request.generateReducer('project', {status: 'loading'});

const reducerData = {
  result: '123',
  status: 'doing-something',
  errorMessage: 'old error message'
};

describe('reducers/request', () => {
  describe('initial state', () => {
    it('should return initial state', () => {
      const state = activityReducer(undefined, {});
      expect(state).to.deep.equal({
        result: '',
        status: '',
        errorMessage: ''
      });
    });

    it('should update status of default initial state', () => {
      const state = projectReducer(undefined, {});
      expect(state).to.deep.equal({
        result: '',
        status: 'loading',
        errorMessage: ''
      });
    });
  });

  describe('activityReducer.request', () => {
    it('should set status and clear errorMessage', () => {
      const state = activityReducer(reducerData, activityActions.request('loading'));
      expect(state).to.deep.equal({
        result: '123',
        status: 'loading',
        errorMessage: ''
      });
    });

    it('should set status and clear result and errorMessage', () => {
      const state = activityReducer(reducerData, activityActions.request('loading', true));
      expect(state).to.deep.equal({
        result: '',
        status: 'loading',
        errorMessage: ''
      });
    });
  });

  describe('activityActions.requestSuccess', () => {
    it('should set result and clear status and errorMessage', () => {
      const state = activityReducer(reducerData, activityActions.requestSuccess('456'));
      expect(state).to.deep.equal({
        result: '456',
        status: '',
        errorMessage: ''
      });
    });
  });

  describe('activityActions.requestError', () => {
    it('should set status and errorMessage', () => {
      const state = activityReducer(reducerData, activityActions.requestError('error-loading', 'error response'));
      expect(state).to.deep.equal({
        result: '123',
        status: 'error-loading',
        errorMessage: 'error response'
      });
    });
  });
});
