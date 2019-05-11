import {expect} from 'chai';
import * as activitySelectors from '../../v2/app/selectors/activity';

const state = {
  activity: {
    result: {
      projects: [
        {
          projectRepo: 'projectRepo',
          project: 'project-id',
          shortid: 'short-id'
        }
      ],
      recent: [
        {
          projectRepo: 'projectRepo',
          project: 'project-id',
          shortid: 'short-id'
        }
      ]
    }
  },
  ui: {
    selected: {
      project: 'project-id'
    }
  }
};

describe('selectors/activity', () => {
  describe('activitySelectors.getDefault', () => {
    it('should return undefined when there are no recent', () => {
      const testState = {
        ...state,
        activity: {
          result: {
            recent: []
          }
        }
      };
      const value = activitySelectors.getDefault(testState);
      expect(value).to.equal(undefined);
    });

    it('should return first build in recent builds', () => {
      const value = activitySelectors.getDefault(state);
      expect(value).to.deep.equal(state.activity.result.projects[0]);
    });
  });

  describe('activitySelectors.getSelectedProject', () => {
    it('should return null when nothing selected', () => {
      const testState = {
        ...state,
        ui: {
          selected: {}
        }
      };
      const value = activitySelectors.getSelectedProject(testState);
      expect(value).to.equal(null);
    });

    it('should return selected project', () => {
      const value = activitySelectors.getSelectedProject(state);
      expect(value).to.deep.equal(state.activity.result.projects[0]);
    });
  });

  describe('activitySelectors.getRouteProject', () => {
    it('should return null when no route params', () => {
      const testState = {
        ...state,
        ui: {
          locationParams: {}
        }
      };
      const value = activitySelectors.getRouteProject(testState);
      expect(value).to.equal(null);
    });

    it('should return project in route by project id', () => {
      const testState = {
        ...state,
        ui: {
          locationParams: {
            project: 'project-id',
            branch: 'branch'
          }
        }
      };
      const value = activitySelectors.getRouteProject(testState);
      expect(value).to.deep.equal(state.activity.result.projects[0]);
    });

    it('should return project in route by shortid', () => {
      const testState = {
        ...state,
        ui: {
          locationParams: {
            project: 'short-id.hello-world',
            branch: 'branch'
          }
        }
      };
      const value = activitySelectors.getRouteProject(testState);
      expect(value).to.deep.equal(state.activity.result.projects[0]);
    });
  });
});
