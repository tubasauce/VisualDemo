import {push} from 'react-router-redux';
import slug from 'slug';
import * as uiActions from '../ui/ui-actions';
import * as accountActions from '../account/account-actions';
import * as usageActions from '../usage/usage-actions';
import * as subscriptionsActions from '../subscriptions/subscriptions-actions';
import * as integrationActions from '../integration/integration-actions';
import * as accountsActions from '../accounts/accounts-actions';
import * as activityActions from '../activity/activity-actions';
import * as projectActions from '../project/project-actions';
import * as statesActions from '../states/states-actions';
import * as activitySelectors from '../../selectors/activity';
import * as statesSelectors from '../../selectors/states';

const getProjectSlug = (state, project) => {
  const activityData = state.activity.result;
  const projectData = activityData.projects.filter((p) => p.project === project)[0];
  if (projectData) {
    return `${projectData.shortid}.${slug(projectData.projectRepo.replace(/\//g, '-'))}`;
  }
  return null;
};

export const toNewProject = () => {
  return (dispatch) => dispatch(push('/v2/new'));
};

export const toDashboard = (project, branch) => {
  return (dispatch, getState) => {
    let routePath = '/v2/dashboard';
    if (project && branch) {
      const projectSlug = getProjectSlug(getState(), project);
      if (projectSlug) {
        // generate friendly url with shortid + slug
        routePath = `/v2/dashboard/${projectSlug}/${encodeURIComponent(branch)}`;
      }
    }
    dispatch(push(routePath));
  };
};

export const toSelectedDashboard = () => {
  return (dispatch, getState) => {
    const selected = getState().ui.selected;
    dispatch(toDashboard(selected.project, selected.branch));
  };
};

export const toStateList = (resolution, testName, filterType) => {
  return (dispatch, getState) => {
    const selected = getState().ui.selected;
    const projectSlug = getProjectSlug(getState(), selected.project);
    let routePath = `/v2/states/${projectSlug}/${encodeURIComponent(selected.branch)}`;
    if (resolution && testName) {
      routePath += `/${encodeURIComponent(resolution)}/${encodeURIComponent(testName)}`;
    }
    if (filterType) {
      dispatch(statesActions.setFilters(filterType));
    }
    dispatch(push(routePath));
  };
};

export const toSelectedStateList = () => {
  return (dispatch, getState) => {
    const selected = getState().ui.selected;
    dispatch(toStateList(selected.resolution, selected.testName));
  };
};

export const toStateDetail = (resolution, testName, stateId) => {
  return (dispatch, getState) => {
    const selected = getState().ui.selected;
    const projectSlug = getProjectSlug(getState(), selected.project);
    const routePath = `/v2/states/${projectSlug}/${encodeURIComponent(selected.branch)}/${encodeURIComponent(resolution)}/${encodeURIComponent(testName)}/${encodeURIComponent(stateId)}`;
    dispatch(push(routePath));
  };
};

export const manager = (params, oldParams) => {
  return (dispatch, getState) => {
    const pathnames = getState().ui.location.pathname.split('/');
    const view = pathnames[2];

    // Account main view:
    if (view === 'account') {
      const page = pathnames[3];
      if (page === 'usage') {
        return dispatch(accountsActions.load())
          .then(() => {
            const accountsData = getState().accounts.result || [];
            if (accountsData.length > 0) {
              dispatch(usageActions.load(accountsData[0]._id));
            }
          });
      }
      if (page === 'notifications') {
        return dispatch(subscriptionsActions.load());
      }
      if (['github', 'github-enterprise', 'vsts'].indexOf(page) >= 0) {
        // reset ui.integration on route change
        dispatch(uiActions.clear('integration'));
        return dispatch(integrationActions.load(page));
      }
      if (page === 'webhooks') {
        return dispatch(accountsActions.load(true))
          .then(() => {
            const accountsData = getState().accounts.result || [];
            if (accountsData.length > 0) {
              return dispatch(integrationActions.loadWebhooks());
            }
          });
      }
      return dispatch(accountActions.init())
        .then(() => {
          if (page === 'api-key') {
            dispatch(accountsActions.load());
          }
          // reset ui.profile on route change
          dispatch(uiActions.set('profile', getState().account.result));
          // reset ui.password on route change
          dispatch(uiActions.clear('password'));
        });
    }

    // Dashboard main view:
    // ensure activity data is loaded
    return dispatch(activityActions.init(params.project))
      .then(() => {
        const state = getState();
        if (state.activity.status === 'loading') return;
        if (view !== 'states') {
          dispatch(uiActions.update('dashboard', 'showOverlay', false));
        }
        if (params.project && params.branch) {
          let branch = params.branch;
          // handle common issue of broken link caused by email url protector filters
          if (branch === '(default') {
            branch = '(default)';
          }
          // check if project exists for route params
          const projectData = activitySelectors.getRouteProject(state);
          if (projectData) {
            // check if selected and params are different
            if (state.ui.selected.project !== projectData.project || state.ui.selected.branch !== branch) {
              // set project+branch as selected
              dispatch(uiActions.set('selected', {
                project: projectData.project,
                branch: branch
              }));
              // load project data
              dispatch(projectActions.load());
              // check if using friendly slug url. if not, update route
              if (view === 'dashboard' && params.project === projectData.project) {
                dispatch(toDashboard(projectData.project, branch));
              }
            }
            if (view === 'states') {
              const findAndSelectState = (redirectWhenNotFound) => {
                // handle only state-detail route
                if (params.stateId) {
                  const stateData = statesSelectors.getRouteState(getState());
                  if (stateData) {
                    dispatch(statesActions.select(stateData));
                    return true;
                  } else if (redirectWhenNotFound) {
                    // when state not found, redirect to state-list
                    dispatch(toSelectedStateList());
                  }
                }
              };
              // if state is found, then return to stop execution from this point
              if (findAndSelectState()) return;
              // when going from dashboard to state-list, always reload data
              // when going from state-detail to state-list, if data already loaded, do not load again
              const forceLoad = !oldParams || !oldParams.stateId;
              dispatch(statesActions.open(params.resolution, params.testName, forceLoad))
                .then(() => {
                  findAndSelectState(true);
                });
            }
          } else {
            // if project doesn't exist, go back to base route
            dispatch(toDashboard());
          }
        } else if (view === 'new') {
          dispatch(accountsActions.load(true));
          dispatch(uiActions.set('selected', {
            project: ''
          }));
          dispatch(uiActions.clear('wizard'));
        } else {
          // select first result by default if no projects are selected
          const defaultBuild = activitySelectors.getDefault(state);
          if (defaultBuild) {
            dispatch(toDashboard(defaultBuild.project, defaultBuild.branch));
          } else {
            // when no projects, redirect to new project route
            dispatch(toNewProject());
          }
        }
      });
  };
};
