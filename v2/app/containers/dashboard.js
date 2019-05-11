import { connect } from 'react-redux';
import Dashboard from '../components/dashboard/dashboard';
import * as uiActions from '../reducers/ui/ui-actions';
import * as activityActions from '../reducers/activity/activity-actions';
import * as routeActions from '../reducers/route/route-actions';
import * as projectActions from '../reducers/project/project-actions';
import * as branchesActions from '../reducers/branches/branches-actions';
import * as buildsActions from '../reducers/builds/builds-actions';
import * as statesActions from '../reducers/states/states-actions';
import * as historyActions from '../reducers/history/history-actions';
import * as projectSelectors from '../selectors/project';
import * as statesSelectors from '../selectors/states';
import * as stateSelectors from '../selectors/state';

const mapStateToProps = (state) => {
  return {
    ui: state.ui,
    activity: state.activity,
    activityData: state.activity.result || {},
    project: state.project,
    projectData: projectSelectors.getCurrent(state),
    branches: state.branches,
    branchesData: (state.branches.result && state.branches.result.results) || [],
    builds: state.builds,
    buildsData: state.builds.result || [],
    states: state.states,
    statesTotals: statesSelectors.getTotals(state),
    statesData: statesSelectors.getFilteredSorted(state),
    statesGroupedData: statesSelectors.getFilteredGroups(state),
    stateData: state.ui.selected.state,
    stateIndex: statesSelectors.getFilteredSortedSelectedIndex(state),
    isAllAccepted: statesSelectors.isAllAccepted(state),
    changes: state.state,
    changesData: stateSelectors.getCurrent(state),
    changesGroupedData: stateSelectors.getChangeGroups(state),
    history: state.history,
    historyData: state.history.result || [],
    accounts: state.accounts,
    accountsData: state.accounts.result || [],
    user: window.appGlobal && window.appGlobal.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleUI: (key, name) => {
      dispatch(uiActions.toggle(key, name));
    },
    updateUI: (key, name, value) => {
      dispatch(uiActions.update(key, name, value));
    },
    closeModal: () => {
      dispatch(uiActions.clear('modal'));
    },
    setActivityType: (tabValue) => {
      dispatch(uiActions.update('dashboard', 'activityType', tabValue));
      if (tabValue === 'projects') {
        dispatch(activityActions.request('loading'));
        dispatch(activityActions.load());
      }
    },
    setResultType: (tabValue) => {
      dispatch(uiActions.update('dashboard', 'resultType', tabValue));
      if (tabValue === 'history') {
        dispatch(buildsActions.load());
      }
    },
    setSideType: (tabValue) => {
      dispatch(uiActions.update('stateDetail', 'sideType', tabValue));
      if (tabValue === 'history') {
        dispatch(historyActions.load());
      }
    },
    toggleHighlights: () => {
      dispatch(statesActions.toggleHighlights());
    },
    toggleContainers: (buildId) => {
      dispatch(uiActions.toggle('showContainers', buildId));
    },
    newProject: () => {
      dispatch(routeActions.toNewProject());
    },
    selectProject: (selectObj) => {
      dispatch(routeActions.toDashboard(selectObj.project, selectObj.branch));
    },
    toggleBranches: (isOpen) => {
      dispatch(uiActions.toggle('dashboard', 'openBranches'));
      if (!isOpen) {
        dispatch(branchesActions.load());
      }
    },
    toggleModal: (modalName) => {
      dispatch(uiActions.toggle('modal', modalName));
    },
    moreBranches: () => {
      dispatch(branchesActions.load(100));
      dispatch(uiActions.update('dashboard', 'openBranches', false));
    },
    moreActivity: () => {
      dispatch(activityActions.loadMore());
    },
    moreBuilds: () => {
      dispatch(buildsActions.loadMore());
    },
    removeBranch: () => {
      dispatch(projectActions.removeBranch());
    },
    removeProject: () => {
      dispatch(projectActions.remove());
    },
    selectState: (state, storeScrollTop) => {
      if (storeScrollTop) {
        dispatch(uiActions.update('dashboard', 'scrollTop', document.querySelector('#state').scrollTop));
      }
      dispatch(routeActions.toStateDetail(state.resolution, state.testName, state.id));
    },
    cancelBuild: (build) => {
      dispatch(buildsActions.cancel(build));
    },
    updateStateStatus: (stateData, newStatus) => {
      dispatch(statesActions.updateStatus(stateData, newStatus));
    },
    addStateIgnore: (stateData, selector) => {
      dispatch(statesActions.addIgnore(stateData, selector));
    },
    removeStateIgnore: (stateData, selector) => {
      dispatch(statesActions.removeIgnore(stateData, selector));
    },
    acceptAllStates: () => {
      dispatch(statesActions.acceptAll());
    },
    acceptStates: (states) => {
      dispatch(statesActions.acceptStates(states));
    },
    closeState: (scrollTop) => {
      dispatch(routeActions.toSelectedStateList());
      if (scrollTop) {
        setTimeout(() => {
          document.querySelector('#state').scrollTop = scrollTop;
        }, 100);
      }
    },
    closeStates: () => {
      dispatch(routeActions.toSelectedDashboard());
    },
    openStates: (filterType, selectObj = {}) => {
      dispatch(routeActions.toStateList(selectObj.resolution, selectObj.testName, filterType));
      dispatch(uiActions.clear('showSections'));
    },
    openSidePanel: () => {
      dispatch(uiActions.update('prefs', 'openSidePanel', true));
    },
    selectAllStatesFilters: () => {
      dispatch(statesActions.setFilters('all'));
    },
    toggleStatesFilter: (status) => {
      dispatch(uiActions.toggle('statesFilterBy', status));
    },
    subscribe: () => {
      dispatch(projectActions.subscribe());
    },
    unsubscribe: () => {
      dispatch(projectActions.unsubscribe());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
