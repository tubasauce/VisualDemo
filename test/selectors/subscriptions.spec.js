import {expect} from 'chai';
import * as subscriptionsSelectors from '../../v2/app/selectors/subscriptions';

const subscriptionsData = {
  projects: [
    {
      project: 'a',
      projectRepo: 'org/repo-a',
      isSubscribed: false
    },
    {
      project: 'c',
      projectRepo: 'org/repo-c',
      isSubscribed: true
    },
    {
      project: 'b',
      projectRepo: 'org/repo-b',
      isSubscribed: true
    }
  ]
};

const state = {
  subscriptions: {
    result: subscriptionsData.projects
  }
};

describe('selectors/subscriptions', () => {
  describe('subscriptionsSelectors.getCurrent', () => {
    it('should return empty array when no states', () => {
      const testState = {
        ...state,
        subscriptions: {
          result: ''
        }
      };
      const value = subscriptionsSelectors.getCurrent(testState);
      expect(value).to.deep.equal([]);
    });

    it('should return subscriptions result', () => {
      const value = subscriptionsSelectors.getCurrent(state);
      expect(value).to.deep.equal(subscriptionsData.projects);
    });
  });

  describe('subscriptionsSelectors.splitProjects', () => {
    it('should return projects sorted and split by subscription type', () => {
      const value = subscriptionsSelectors.splitProjects(state);
      expect(value).to.deep.equal({
        subscribed: [
          subscriptionsData.projects[2],
          subscriptionsData.projects[1]
        ],
        unsubscribed: [
          subscriptionsData.projects[0]
        ]
      });
    });
  });

});
