import {createSelector} from 'reselect';

const getActivity = (state) => state.activity.result;
const getSelected = (state) => state.ui.selected;
const getLocationParams = (state) => state.ui.locationParams;

export const getDefault = createSelector(
  getActivity,
  (activityData) => activityData.recent[0]
);

export const getSelectedProject = createSelector(
  getActivity,
  getSelected,
  (activityData, selected) => {
    if (activityData.projects && selected.project) {
      return activityData.projects.filter((p) => p.project === selected.project)[0];
    }
    return null;
  }
);

export const getRouteProject = createSelector(
  getActivity,
  getLocationParams,
  (activityData, params) => {
    if (activityData.projects && params.project && params.branch) {
      // parse shortid out of project param. format = "shortid.slug"
      const id = params.project.split('.')[0];
      let result = activityData.projects.filter((p) => p.shortid === id)[0];
      if (!result) {
        // if not found, try comparing against project id
        result = activityData.projects.filter((p) => p.project === id)[0];
      }
      return result;
    }
    return null;
  }
);
