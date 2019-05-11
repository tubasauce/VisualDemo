import fetchMock from 'fetch-mock';
import {API_URL} from '../../api';

const date = new Date();
date.setMonth(date.getMonth() - 1)
const oneMonthAgo = date.toISOString().substring(0, 10);

fetchMock.get(`${API_URL}/activity?type=recent&limit=8`, {
  accounts: ['account-id'],
  projects: [{
    project: 'project-id',
    build: 'build',
    status: 'failure',
    start: `${oneMonthAgo}T02:02:18.397Z`,
    projectRepo: 'user/project-repo',
    shortid: 'short-id',
    branch: 'master'
  }],
  recent: [{
    project: 'project-id',
    build: 'build',
    status: 'failure',
    start: `${oneMonthAgo}T02:02:18.397Z`,
    projectRepo: 'user/project-repo',
    shortid: 'short-id',
    branch: 'master'
  }]
});

fetchMock.get(`${API_URL}/accounts?admin=true`, {
  accounts: [
    {
      name: 'My Account',
      apiKey: 'api-key',
      role: 'owner'
    }
  ]
});

fetchMock.get(`express:${API_URL}/projects/:project/branches/:branch`, (url, opts) =>
  ({
    project: opts.url.split('/')[2],
    branch: opts.url.split('/')[4],
    maxConcurrent: 8,
    role: 'admin',
    projectRepo: 'user/project-repo',
    isSubscribed: true,
    latestBuild: {
      _id: 'build-id',
      build: 'build',
      status: 'failure',
      start: `${oneMonthAgo}T02:02:18.397Z`,
      end: `${oneMonthAgo}T02:05:50.914Z`,
      branch: 'master',
      containers: [
        {
          name: 'Chrome',
          status: 'complete',
          resolution: '1024x768',
          start: `${oneMonthAgo}T02:04:19.646Z`,
          end: `${oneMonthAgo}T02:06:00.311Z`,
          logUrl: 'log-url'
        }
      ]
    },
    tests: [
      {
        name: 'Chrome',
        browserName: 'chrome',
        resolution: '1024x768',
        totals: {
            new: 0,
            changed: 2,
            accepted: 2,
            rejected: 0,
            all: 4
        },
        updatedAt: oneMonthAgo
      }
    ]
  })
);

fetchMock.get(`express:${API_URL}/projects/:project/branches/:branch/states`, (url, opts) => {
  let results = [];
  for (var i = 0; i < 4; i++) {
    results.push({
      _id: `state-${i}`,
      id: `state-${i}`,
      name: `State Name ${i}`,
      status: (i % 2 == 0) ? 'accepted' : 'changed',
      ignores: [],
      resolution: '1024x768',
      testName: 'Chrome',
      thumbnailUrl: 'http://placehold.it/320x160',
      currentUrl: 'http://placehold.it/1024x768',
      referenceUrl: 'http://placehold.it/1024x768'
    });
  }
  return {results};
});

fetchMock.post(`express:${API_URL}/projects/:project/branches/:branch/states`, {success: true});
