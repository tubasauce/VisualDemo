import {createSelector} from 'reselect';
import sortBy from 'lodash/sortBy';

export const getCurrent = (state) => state.subscriptions.result || [];

export const splitProjects = createSelector(
  getCurrent,
  (subscriptionsData) => {
    const sortedSubscriptions = sortBy(subscriptionsData, ['projectRepo']);
    return {
      subscribed: sortedSubscriptions.filter((project) => project.isSubscribed),
      unsubscribed: sortedSubscriptions.filter((project) => !project.isSubscribed)
    };
  }
);
