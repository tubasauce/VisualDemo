import {createSelector} from 'reselect';

const getCurrentResult = (state) => state.state.result || {changes: []};

const getSelectedState = (state) => state.ui.selected.state;

export const getCurrent = createSelector(
  getCurrentResult,
  getSelectedState,
  (changesData, selectedState) => {
    if (selectedState && selectedState.ignores && selectedState.ignores.length > 0) {
      // map ignores to changes
      return {
        ...changesData,
        changes: changesData.changes.map(change =>
          ({
            ...change,
            // check if change.selector starts with ignore selector
            // so that all children of selector are also handled
            ignored: selectedState.ignores.some(selector => change.selector.indexOf(selector) === 0)
          })
        )
      };
    }
    return changesData;
  }
);

// get total changes which have not been ignored
export const getTotalChanges = createSelector(
  getCurrent,
  (changesData) =>
    changesData.changes.filter(c => !c.ignored).length
);

export const getChangeGroups = createSelector(
  getCurrent,
  (changesData) =>
    [
      {
        name: 'Structure',
        type: 'dom',
        changes: changesData.changes.filter(c => c.dom)
      },
      {
        name: 'Layout',
        type: 'layout',
        changes: changesData.changes.filter(c => c.layout)
      },
      {
        name: 'Style',
        type: 'css',
        changes: changesData.changes.filter(c => c.css)
      },
      {
        name: 'Content',
        type: 'content',
        changes: changesData.changes.filter(c => c.text || c.media)
      }
    ]
);
