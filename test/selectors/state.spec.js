import {expect} from 'chai';
import * as stateSelectors from '../../v2/app/selectors/state';

const changesData = {
  changes: [
    {
      selector: '.selector',
      dom: true
    },
    {
      selector: '.selector > .more',
      layout: true
    },
    {
      selector: '.other',
      css: true
    },
    {
      selector: '.other > .more-1',
      text: true
    },
    {
      selector: '.other > .more-2',
      media: true
    }
  ]
};

const state = {
  state: {
    result: changesData
  },
  ui: {
    selected: {
      state: {
        ignores: ['.selector']
      }
    }
  }
};

describe('selectors/state', () => {
  describe('stateSelectors.getCurrent', () => {
    it('should return default changes when no changes', () => {
      const testState = {
        state: {
          result: ''
        },
        ui: {
          selected: {}
        }
      };
      const value = stateSelectors.getCurrent(testState);
      expect(value).to.deep.equal({changes: []});
    });

    it('should return all changes as-is when no ignores', () => {
      const testState = {
        ...state,
        ui: {
          selected: {}
        }
      };
      const value = stateSelectors.getCurrent(testState);
      expect(value).to.deep.equal(changesData);
    });

    it('should return all changes with ignored when has ignores', () => {
      const value = stateSelectors.getCurrent(state);
      expect(value).to.deep.equal({
        changes: [
          {...changesData.changes[0], ignored: true},
          {...changesData.changes[1], ignored: true},
          {...changesData.changes[2], ignored: false},
          {...changesData.changes[3], ignored: false},
          {...changesData.changes[4], ignored: false},
        ]
      });
    });
  });

  describe('stateSelectors.getTotalChanges', () => {
    it('should return total changes not ignored', () => {
      const value = stateSelectors.getTotalChanges(state);
      expect(value).to.equal(3);
    });
  });

  describe('stateSelectors.getChangeGroups', () => {
    it('should group changes by change type', () => {
      const value = stateSelectors.getChangeGroups(state);
      expect(value).to.deep.equal([
        {
          name: 'Structure',
          type: 'dom',
          changes: [{...changesData.changes[0], ignored: true}]
        },
        {
          name: 'Layout',
          type: 'layout',
          changes: [{...changesData.changes[1], ignored: true}]
        },
        {
          name: 'Style',
          type: 'css',
          changes: [{...changesData.changes[2], ignored: false}]
        },
        {
          name: 'Content',
          type: 'content',
          changes: [
            {...changesData.changes[3], ignored: false},
            {...changesData.changes[4], ignored: false}
          ]
        }
      ]);
    });
  });
});
