import {createSelector} from 'reselect';
import uniqBy from 'lodash/uniqBy';
import sortBy from 'lodash/sortBy';

const getFilterBy = (state) => state.ui.statesFilterBy;
const getSelectedState = (state) => state.ui.selected.state;
const getSelectedStates = (state) => state.ui.selected.states || [];
const getLocationParams = (state) => state.ui.locationParams;

export const getCurrent = (state) => state.states.result || [];

export const getRouteState = createSelector(
  getCurrent,
  getLocationParams,
  (statesData, params) => {
    if (params.resolution && params.testName && params.stateId) {
      return statesData.filter((state) =>
        (state.resolution === params.resolution && state.testName === params.testName && state.id === params.stateId)
      )[0];
    }
    return null;
  }
);

export const getTotals = createSelector(
  getCurrent,
  getFilterBy,
  (statesData, filterBy) => {
    let totals = {
      changed: 0,
      new: 0,
      accepted: 0,
      rejected: 0
    };
    statesData.forEach((state) => {
      if (filterBy.reviewed) {
        if (state.isReviewed) {
          totals[state.status]++;
        }
      } else {
        totals[state.status]++;
      }
    });
    return totals;
  }
);

export const getFiltered = createSelector(
  getCurrent,
  getFilterBy,
  (statesData, filterBy) =>
    statesData.filter((state) => {
      if (filterBy.reviewed) {
        return filterBy[state.status] && state.isReviewed;
      } else {
        return filterBy[state.status];
      }
    })
);

export const getFilteredNotAccepted = createSelector(
  getFiltered,
  (filteredStates) =>
    filteredStates.filter((state) => state.status !== 'accepted')
);

export const getFilteredGroups = createSelector(
  getFiltered,
  (filteredStates) => {
    const groups = uniqBy(filteredStates, (state) => `${state.resolution}/${state.testName}`);
    const sortedGroups = sortBy(groups, [(group) => parseInt(group.resolution.split('x')[0]), 'testName']);
    const groupedStates = sortedGroups.map((group) => {
      const states = filteredStates.filter((state) => group.resolution === state.resolution && group.testName === state.testName);
      let sections = [];
      // only set sections if ALL states have ':' delimiter
      if (states.filter((state) => (state.name || '').indexOf(': ') > 0).length === states.length) {
        sections = uniqBy(states.map((state) => ({
          _id: state._id,
          name: state.name.split(': ')[0]
        })), 'name');
      }
      return {
        resolution: group.resolution,
        testName: group.testName,
        sections,
        states
      };
    });

    return groupedStates;
  }
);

export const getFilteredSortedIds = createSelector(
  getFilteredGroups,
  (filteredGroups) => {
    let filteredSortedStates = [];
    filteredGroups.forEach(group =>
      group.states.forEach(state => filteredSortedStates.push(state))
    );
    // return id's only
    return filteredSortedStates.map((state) => state._id);
  }
);

export const getFilteredSorted = createSelector(
  getCurrent,
  getSelectedStates,
  (statesData, statesIds) => {
    let filteredSortedStates = [];
    statesIds.forEach(id =>
      statesData.forEach(state => {
        if (state._id === id) {
          filteredSortedStates.push(state);
        }
      })
    );
    return filteredSortedStates;
  }
);

export const getFilteredSortedSelectedIndex = createSelector(
  getFilteredSorted,
  getSelectedState,
  (filteredSortedStates, stateData) => {
    let index = -1;
    if (stateData) {
      filteredSortedStates.forEach((state, i) => {
        if (stateData._id === state._id) {
          index = i;
        }
      });
    }
    return index;
  }
);

export const isAllAccepted = createSelector(
  getFiltered,
  (filteredStates) =>
    filteredStates.filter((state) => state.status !== 'accepted').length === 0
);
