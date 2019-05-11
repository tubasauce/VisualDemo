import {expect} from 'chai';
import * as projectSelectors from '../../v2/app/selectors/project';

const projectData = {
  role: 'admin',
  tests: [
    {
      resolution: '1024x768',
      totals: {
        changed: 2,
        new: 2,
        accepted: 10,
        rejected: 0
      }
    },
    {
      resolution: '320x480',
      totals: {
        changed: 1,
        new: 1,
        accepted: 5,
        rejected: 0
      }
    },
    {
      resolution: '320x480',
      totals: {
        changed: 1,
        new: 1,
        accepted: 5,
        rejected: 0
      }
    }
  ]
};
const state = {
  project: {
    result: projectData
  },
  activity: {
    result: {
      projects: [
        {
          project: 'project-id',
          role: 'admin'
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

describe('selectors/project', () => {
  describe('projectSelectors.getCurrent', () => {
    it('should return empty object when no project data', () => {
      const testState = {
        ...state,
        project: {
          result: null
        }
      };
      const value = projectSelectors.getCurrent(testState);
      expect(value).to.deep.equal({});
    });

    it('should return project data totals and resolution groups', () => {
      const value = projectSelectors.getCurrent(state);
      expect(value).to.deep.equal({
        ...projectData,
        totals: {
          changed: 4,
          new: 4,
          accepted: 20,
          rejected: 0
        },
        resolutions: [
          {
            resolution: '320x480',
            tests: [
              projectData.tests[1],
              projectData.tests[2]
            ]
          },
          {
            resolution: '1024x768',
            tests: [
              projectData.tests[0]
            ]
          }
        ]
      });
    });
  });
});
