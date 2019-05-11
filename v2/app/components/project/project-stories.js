import React from 'react';
import { storiesOf } from '@storybook/react';
import Project from './project';

const currentTab = {
  dashboard: {
    resultType: 'current'
  },
  showContainers: {},
  buildsLimit: {}
};
const historyTab = {
  dashboard: {
    resultType: 'history'
  },
  showContainers: {},
  buildsLimit: {}
};
const buildData = {
  _id: '25242343423',
  branch: 'branch',
  build: '108',
  status: 'success',
  start: '2016-12-12T05:43:22.271Z',
  end: '2016-12-12T05:45:22.271Z',
  containers: [
    {
      status: 'complete',
      name: 'Chrome',
      resolution: '1280x1024',
      logUrl: 'log-url',
      start: '2016-12-12T05:43:22.271Z',
      end: '2016-12-12T05:45:22.271Z'
    }
  ]
};
const updatedAt = new Date(new Date().setDate(new Date().getDate() - 1)).toISOString();
const projectData = {
  projectRepo: 'user/project-repo',
  branch: 'branch',
  maxConcurrent: 8,
  role: 'admin',
  totals: {
    changed: 20,
    new: 20,
    accepted: 20,
    rejected: 0
  },
  resolutions: [
    {
      resolution: '1280x1024',
      tests: [
        {
          name: 'Chrome',
          browserName: 'chrome',
          resolution: '1280x1024',
          totals: {
            changed: 10,
            new: 10,
            accepted: 10,
            rejected: 0
          },
          updatedAt
        },
        {
          name: 'Firefox',
          browserName: 'firefox',
          resolution: '1280x1024',
          totals: {
            changed: 10,
            new: 10,
            accepted: 10,
            rejected: 0
          },
          updatedAt
        }
      ]
    }
  ],
  latestBuild: {
    ...buildData,
    status: 'running'
  }
};
const buildsData = [
  {
    ...buildData,
    status: 'running'
  },
  buildData
];

storiesOf('Project', module)
    .add('loading', () => (
      <Project
        project={{status: 'loading'}}
        ui={currentTab}
        projectData={{}}
      />
    ))
    .add('current results', () => (
      <Project
        project={{status: ''}}
        branches={{status: ''}}
        branchesData={[]}
        ui={currentTab}
        projectData={{...projectData, latestBuild: buildsData[1], totalReviewed: 0}}
        user={{}}
      />
    ))
    .add('reviewed results', () => (
      <Project
        project={{status: ''}}
        branches={{status: ''}}
        branchesData={[]}
        ui={currentTab}
        projectData={{...projectData, latestBuild: buildsData[1], totalReviewed: 3}}
        user={{}}
      />
    ))
    .add('no current results', () => (
      <Project
        project={{status: ''}}
        branches={{status: ''}}
        branchesData={[]}
        ui={currentTab}
        projectData={{...projectData, resolutions: []}}
        user={{}}
      />
    ))
    .add('build history', () => (
      <Project
        project={{status: ''}}
        branches={{status: ''}}
        branchesData={[]}
        ui={historyTab}
        projectData={projectData}
        builds={{status:''}}
        buildsData={buildsData}
        user={{}}
      />
    ))
    .add('show more builds', () => (
      <Project
        project={{status: ''}}
        branches={{status: ''}}
        branchesData={[]}
        ui={historyTab}
        projectData={projectData}
        builds={{status:''}}
        buildsData={[buildData, buildData, buildData, buildData, buildData, buildData, buildData, buildData, buildData, buildData]}
        user={{}}
      />
    ))
    .add('options menu', () => (
      <Project
        project={{status: ''}}
        branches={{status: ''}}
        branchesData={[]}
        ui={{
          dashboard: {
            resultType: 'current',
            openOptions: true
          },
          showContainers: {}
        }}
        projectData={{...projectData, latestBuild: buildsData[1]}}
        user={{}}
      />
    ))
    .add('options menu not admin', () => (
      <Project
        project={{status: ''}}
        branches={{status: ''}}
        branchesData={[]}
        ui={{
          dashboard: {
            resultType: 'current',
            openOptions: true
          },
          showContainers: {}
        }}
        projectData={{...projectData, role: 'tester', latestBuild: buildsData[1]}}
        user={{}}
      />
    ))
    .add('branches menu', () => (
      <Project
        project={{status: ''}}
        branches={{status: ''}}
        branchesData={['branch', 'master']}
        ui={{
          dashboard: {
            resultType: 'current',
            openBranches: true
          },
          showContainers: {}
        }}
        projectData={{...projectData, latestBuild: buildsData[1]}}
        user={{}}
      />
    ))
    .add('no user', () => (
      <Project
        project={{status: ''}}
        branches={{status: ''}}
        branchesData={[]}
        ui={currentTab}
        projectData={{...projectData, latestBuild: buildsData[1], totalReviewed: 0}}
      />
    ));
