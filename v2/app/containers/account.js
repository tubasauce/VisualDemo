import { connect } from 'react-redux';
import Account from '../components/account/account';
import * as accountActions from '../reducers/account/account-actions';
import * as usageActions from '../reducers/usage/usage-actions';
import * as subscriptionsActions from '../reducers/subscriptions/subscriptions-actions';
import * as integrationActions from '../reducers/integration/integration-actions';
import * as uiActions from '../reducers/ui/ui-actions';
import * as subscriptionsSelectors from '../selectors/subscriptions';

const mapStateToProps = (state) => {
  return {
    ui: state.ui,
    account: state.account,
    accountData: state.account.result || {},
    accounts: state.accounts,
    accountsData: state.accounts.result || [],
    usage: state.usage,
    usageData: state.usage.result || {},
    subscriptions: state.subscriptions,
    subscriptionsData: subscriptionsSelectors.splitProjects(state),
    integration: state.integration,
    integrationData: state.integration.result || {},
    user: window.appGlobal && window.appGlobal.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUI: (key, name, value) => {
      dispatch(uiActions.update(key, name, value));
    },
    closeModal: () => {
      dispatch(uiActions.clear('modal'));
    },
    setProfile: (name, value) => {
      dispatch(uiActions.update('profile', name, value));
    },
    updateProfile: (profile) => {
      dispatch(accountActions.updateProfile(profile));
    },
    generateNewKey: () => {
      dispatch(accountActions.generateNewKey());
    },
    setPassword: (name, value) => {
      dispatch(uiActions.update('password', name, value));
    },
    changePassword: (oldPassword, newPassword) => {
      dispatch(accountActions.changePassword(oldPassword, newPassword));
    },
    setIntegration: (name, value) => {
      dispatch(uiActions.update('integration', name, value));
    },
    addIntegration: (integrationType, data) => {
      dispatch(integrationActions.add(integrationType, data));
    },
    removeIntegration: (integrationType) => {
      dispatch(integrationActions.remove(integrationType));
    },
    addWebhook: (data) => {
      dispatch(uiActions.clear('modal'));
      dispatch(integrationActions.addWebhook(data));
    },
    removeWebhook: (webhookId) => {
      dispatch(integrationActions.removeWebhook(webhookId));
    },
    subscribe: (project) => {
      dispatch(subscriptionsActions.update(project, 'subscribe'));
    },
    unsubscribe: (project) => {
      dispatch(subscriptionsActions.update(project, 'unsubscribe'));
    },
    getUsage: (accountId) => {
      dispatch(usageActions.load(accountId));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Account);
