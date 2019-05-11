import request from '../utils/request';

export const API_URL = process.env.SCREENER_API_URL;

export const getActivity = (project, activityType, limit = 8) =>
  request({
    url: project ? `${API_URL}/projects/${project}/activity?type=${activityType}&limit=${limit}` : `${API_URL}/activity?type=${activityType}&limit=${limit}`
  });

export const getProjectBranch = (project, branch) =>
  request({
    url: `${API_URL}/projects/${project}/branches/${encodeURIComponent(branch)}`
  });

export const getProjectBranches = (project, limit) =>
  request({
    url: `${API_URL}/projects/${project}/branches?limit=${limit}`
  });

export const subscribeToProject = (project) =>
  request({
    method: 'post',
    url: `${API_URL}/projects/${project}/subscription`
  });

export const unsubscribeFromProject = (project) =>
  request({
    method: 'delete',
    url: `${API_URL}/projects/${project}/subscription`
  });

export const removeProjectBranch = (project, branch) =>
  request({
    method: 'delete',
    url: `${API_URL}/projects/${project}/branches/${encodeURIComponent(branch)}`
  });

export const removeProject = (project) =>
  request({
    method: 'delete',
    url: `${API_URL}/projects/${project}`
  });

export const getBranchBuilds = (project, branch, limit = 10) =>
  request({
    url: `${API_URL}/projects/${project}/branches/${encodeURIComponent(branch)}/builds?limit=${limit}`
  });

export const cancelBuild = (project, branch, build) =>
  request({
    method: 'delete',
    url: `${API_URL}/projects/${project}/branches/${encodeURIComponent(branch)}/builds/${encodeURIComponent(build)}`
  });

export const getStates = (project, branch, resolution, testName) => {
  let queryString = '';
  if (resolution && testName) {
    queryString = `?resolution=${encodeURIComponent(resolution)}&testName=${encodeURIComponent(testName)}`;
  }
  return request({
    url: `${API_URL}/projects/${project}/branches/${encodeURIComponent(branch)}/states${queryString}`
  });
};

export const updateStateStatus = (project, branch, stateData, newStatus) =>
  request({
    method: 'post',
    url: `${API_URL}/projects/${project}/branches/${encodeURIComponent(branch)}/states`,
    body: {
      states: [
        {
          _id: stateData._id,
          status: newStatus
        }
      ]
    }
  });

export const acceptStates = (project, branch, states) =>
  request({
    method: 'post',
    url: `${API_URL}/projects/${project}/branches/${encodeURIComponent(branch)}/states`,
    body: {
      states: states.map((state) => ({
        _id: state._id,
        status: 'accepted'
      }))
    }
  });

export const addStateIgnore = (project, branch, stateData, selector) =>
  request({
    method: 'post',
    url: `${API_URL}/projects/${project}/branches/${encodeURIComponent(branch)}/states/${stateData._id}/ignore`,
    body: {
      selector
    }
  });

export const removeStateIgnore = (project, branch, stateData, selector) =>
  request({
    method: 'delete',
    url: `${API_URL}/projects/${project}/branches/${encodeURIComponent(branch)}/states/${stateData._id}/ignore`,
    body: {
      selector
    }
  });

export const getStateChanges = (changesUrl) =>
  request({
    url: changesUrl
  });

export const getStateHistory = (project, branch, stateData) =>
  request({
    url: `${API_URL}/projects/${project}/branches/${encodeURIComponent(branch)}/states/history?resolution=${encodeURIComponent(stateData.resolution)}&testName=${encodeURIComponent(stateData.testName)}&state=${encodeURIComponent(stateData.id)}`
  });

export const getAccount = () =>
  request({
    url: `${API_URL}/account`
  });

export const getUsage = (account) =>
  request({
    url: `${API_URL}/accounts/${account}/usage`
  });

export const getSubscriptions = () =>
  request({
    url: `${API_URL}/account/subscriptions`
  });

export const generateNewKey = () =>
  request({
    method: 'post',
    url: `${API_URL}/account/api-key`
  });

export const updateProfile = (profile) =>
  request({
    method: 'post',
    url: `${API_URL}/account/profile`,
    body: profile
  });

export const changePassword = (oldPassword, newPassword) =>
  request({
    method: 'post',
    url: `${API_URL}/account/password`,
    body: {
      oldPassword,
      newPassword
    }
  });

export const getAccounts = (adminOnly) =>
  request({
    url: `${API_URL}/accounts${adminOnly ? '?admin=true' : ''}`
  });

export const getIntegration = (integrationType) =>
  request({
    url: `${API_URL}/account/integrations/${integrationType}`
  });

export const addIntegration = (integrationType, data) =>
  request({
    method: 'post',
    url: `${API_URL}/account/integrations/${integrationType}`,
    body: data
  });

export const removeIntegration = (integrationType) =>
  request({
    method: 'delete',
    url: `${API_URL}/account/integrations/${integrationType}`
  });

export const getWebhooks = (account) =>
  request({
    url: `${API_URL}/accounts/${account}/integrations/webhooks`
  });

export const addWebhook = (account, data) =>
  request({
    method: 'post',
    url: `${API_URL}/accounts/${account}/integrations/webhooks`,
    body: data
  });

export const removeWebhook = (account, webhook) =>
  request({
    method: 'delete',
    url: `${API_URL}/accounts/${account}/integrations/webhooks/${webhook}`
  });
