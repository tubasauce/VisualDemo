import {expect} from 'chai';
import * as statesSelectors from '../../v2/app/selectors/states';

const statesData = [
  {
    _id: 'state-1',
    id: 'state-1',
    name: 'State A',
    status: 'changed',
    resolution: '320x480',
    testName: 'firefox'
  },
  {
    _id: 'state-2',
    id: 'state-2',
    name: 'State B',
    status: 'new',
    resolution: '1024x768',
    testName: 'firefox'
  },
  {
    _id: 'state-3',
    id: 'state-3',
    name: 'State C',
    status: 'accepted',
    resolution: '320x480',
    testName: 'chrome',
    isReviewed: true,
    userName: 'someone'
  },
  {
    _id: 'state-4',
    id: 'state-4',
    name: 'State D',
    status: 'rejected',
    resolution: '1024x768',
    testName: 'chrome',
    isReviewed: true,
    userName: 'someone'
  }
];

const state = {
  states: {
    result: statesData
  },
  ui: {
    selected: {
      state: statesData[1],
      states: ['state-1', 'state-2']
    },
    statesFilterBy: {
      changed: true,
      new: true,
      accepted: true,
      rejected: false
    }
  }
};
const reviewedState = {
  ...state,
  ui: {
    ...state.ui,
    statesFilterBy: {
      ...state.ui.statesFilterBy,
      reviewed: true
    }
  }
};

describe('selectors/states', () => {
  describe('statesSelectors.getCurrent', () => {
    it('should return empty array when no states', () => {
      const testState = {
        ...state,
        states: {
          result: ''
        }
      };
      const value = statesSelectors.getCurrent(testState);
      expect(value).to.deep.equal([]);
    });

    it('should return states result', () => {
      const value = statesSelectors.getCurrent(state);
      expect(value).to.deep.equal(statesData);
    });
  });

  describe('statesSelectors.getRouteState', () => {
    it('should return null when no route params', () => {
      const testState = {
        ...state,
        ui: {
          locationParams: {}
        }
      };
      const value = statesSelectors.getRouteState(testState);
      expect(value).to.equal(null);
    });

    it('should return state in route', () => {
      const testState = {
        ...state,
        ui: {
          locationParams: {
            resolution: '320x480',
            testName: 'chrome',
            stateId: 'state-3'
          }
        }
      };
      const value = statesSelectors.getRouteState(testState);
      expect(value).to.deep.equal(statesData[2]);
    });
  });

  describe('statesSelectors.getTotals', () => {
    it('should return totals by status', () => {
      const value = statesSelectors.getTotals(state);
      expect(value).to.deep.equal({
        changed: 1,
        new: 1,
        accepted: 1,
        rejected: 1
      });
    });

    it('should return totals of reviewed states by status', () => {
      const value = statesSelectors.getTotals(reviewedState);
      expect(value).to.deep.equal({
        changed: 0,
        new: 0,
        accepted: 1,
        rejected: 1
      });
    });
  });

  describe('statesSelectors.getFiltered', () => {
    it('should return states filtered', () => {
      const value = statesSelectors.getFiltered(state);
      expect(value).to.deep.equal([
        statesData[0],
        statesData[1],
        statesData[2]
      ]);
    });

    it('should return reviewed states filtered', () => {
      const value = statesSelectors.getFiltered(reviewedState);
      expect(value).to.deep.equal([
        statesData[2]
      ]);
    });
  });

  describe('statesSelectors.getFilteredSortedIds', () => {
    it('should return states filtered and sorted by resolution and testName', () => {
      const value = statesSelectors.getFilteredSortedIds(state);
      expect(value).to.deep.equal([
        statesData[2]._id,
        statesData[0]._id,
        statesData[1]._id
      ]);
    });
  });

  describe('statesSelectors.getFilteredSorted', () => {
    it('should return states from selected.states ids', () => {
      const value = statesSelectors.getFilteredSorted(state);
      expect(value).to.deep.equal([
        statesData[0],
        statesData[1]
      ]);
    });
  });

  describe('statesSelectors.getFilteredNotAccepted', () => {
    it('should return states filtered and not accepted', () => {
      const value = statesSelectors.getFilteredNotAccepted(state);
      expect(value).to.deep.equal([
        statesData[0],
        statesData[1]
      ]);
    });
  });

  describe('statesSelectors.getFilteredGroups', () => {
    it('should return states grouped and sorted by resolution and testName', () => {
      const value = statesSelectors.getFilteredGroups(state);
      expect(value).to.deep.equal([
        {
          resolution: '320x480',
          testName: 'chrome',
          sections: [],
          states: [statesData[2]]
        },
        {
          resolution: '320x480',
          testName: 'firefox',
          sections: [],
          states: [statesData[0]]
        },
        {
          resolution: '1024x768',
          testName: 'firefox',
          sections: [],
          states: [statesData[1]]
        }
      ]);
    });

    it('should segment states into sections', () => {
      const testStatesData = [
        {
          _id: 'state-1',
          id: 'state-1',
          name: 'State A: scenario 1',
          status: 'changed',
          resolution: '1024x768',
          testName: 'chrome'
        },
        {
          _id: 'state-2',
          id: 'state-2',
          name: 'State A: scenario 2',
          status: 'new',
          resolution: '1024x768',
          testName: 'chrome'
        },
        {
          _id: 'state-3',
          id: 'state-3',
          name: 'State:B: default',
          status: 'accepted',
          resolution: '1024x768',
          testName: 'chrome'
        }
      ];
      const testState = {
        ...state,
        states: {
          result: testStatesData
        }
      };

      const value = statesSelectors.getFilteredGroups(testState);
      expect(value).to.deep.equal([
        {
          resolution: '1024x768',
          testName: 'chrome',
          sections: [
            {
              _id: 'state-1',
              name: 'State A'
            },
            {
              _id: 'state-3',
              name: 'State:B'
            }
          ],
          states: testStatesData
        }
      ]);
    });
  });

  describe('statesSelectors.getFilteredSortedSelectedIndex', () => {
    it('should return index of selected states in filtered and sorted states', () => {
      const value = statesSelectors.getFilteredSortedSelectedIndex(state);
      expect(value).to.equal(1);
    });
  });

  describe('statesSelectors.isAllAccepted', () => {
    it('should return true if filtered states are all accepted', () => {
      const testState = {
        ...state,
        states: {
          result: [
            {status: 'accepted'},
            {status: 'accepted'}
          ]
        }
      };
      const value = statesSelectors.isAllAccepted(testState);
      expect(value).to.equal(true);
    });

    it('should return false if filtered states are not all accepted', () => {
      const value = statesSelectors.isAllAccepted(state);
      expect(value).to.equal(false);
    });
  });

});
