import {createSelector} from 'reselect';
import * as activitySelectors from './activity';
import Immutable from 'seamless-immutable';
import uniq from 'lodash/uniq';
import sortBy from 'lodash/sortBy';

const getCurrentProject = (state) => state.project.result;

export const getCurrent = createSelector(
  getCurrentProject,
  activitySelectors.getSelectedProject,
  (projectData, selectedProject) => {
    // handle empty state
    if (!projectData) {
      return {};
    }
    // make mutable copy
    let projectCopy = Immutable.asMutable(projectData, {deep: true});
    // get role
    if (selectedProject) {
      projectCopy.role = selectedProject.role;
    }
    projectCopy.totals = {
      changed: 0,
      new: 0,
      accepted: 0,
      rejected: 0
    };
    let resolutions = [];
    projectCopy.tests.forEach((test) => {
      // merge totals across all tests
      projectCopy.totals.changed += test.totals.changed;
      projectCopy.totals.new += test.totals.new;
      projectCopy.totals.accepted += test.totals.accepted;
      projectCopy.totals.rejected += test.totals.rejected;
      // gather resolutions
      resolutions.push(test.resolution);
    });
    // dedupe and sort resolutions
    resolutions = sortBy(uniq(resolutions), (res) => parseInt(res.split('x')[0]));
    // group by resolution
    projectCopy.resolutions = [];
    resolutions.forEach((resolution) => {
      let resObj = {
        resolution,
        tests: []
      };
      projectCopy.tests.forEach((test) => {
        if (test.resolution === resolution) {
          resObj.tests.push(test);
        }
      });
      projectCopy.resolutions.push(resObj);
    });
    return Immutable(projectCopy);
  }
);
