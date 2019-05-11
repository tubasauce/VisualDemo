import React from 'react';
import { storiesOf } from '@storybook/react';
import Activity from './activity';

const now = new Date().getTime();
const day = 24 * 60 * 60 * 1000;
const start = new Date(now - day).toString();

const error = {
  status: 'error-loading',
  errorMessage: 'error message'
};
const recentTab = {
  selected: {
    project: 'project-id',
    branch: 'master'
  },
  dashboard: {
    activityType: 'recent'
  }
};
const projectsTab = {
  selected: {
    project: 'project-id',
    branch: 'master'
  },
  dashboard: {
    activityType: 'projects'
  }
};
const projects = [
  {
    projectRepo: 'user/project-repo',
    project: 'project-id',
    branch: 'master',
    build: '108',
    status: 'success',
    start: start
  }
];
const activityData = {
  projects,
  recent: projects
};
const noActivityData = {
  projects: [],
  recent: []
};

storiesOf('Activity', module)
    .add('loading recent', () => (
      <Activity ui={recentTab} activity={{status: 'loading'}} activityData={{}} user={{}} />
    ))
    .add('loading projects', () => (
      <Activity ui={projectsTab} activity={{status: 'loading'}} activityData={{}} user={{}} />
    ))
    .add('loading error', () => (
      <Activity ui={recentTab} activity={error} activityData={{}} user={{}} />
    ))
    .add('loaded recent', () => (
      <Activity ui={recentTab} activity={{status: ''}} activityData={activityData} user={{}} />
    ))
    .add('loaded projects', () => (
      <Activity ui={projectsTab} activity={{status: ''}} activityData={activityData} user={{}} />
    ))
    .add('empty recent', () => (
      <Activity ui={recentTab} activity={{status: ''}} activityData={noActivityData} user={{}} />
    ))
    .add('empty projects', () => (
      <Activity ui={projectsTab} activity={{status: ''}} activityData={noActivityData} user={{}} />
    ))
    .add('new project', () => (
      <Activity ui={{...recentTab, selected: { project: '' }}} activity={{status: ''}} activityData={noActivityData} user={{}} />
    ))
    .add('no user', () => (
      <Activity ui={recentTab} activity={{status: ''}} activityData={activityData} />
    ))
    .add('show more', () => (
      <Activity ui={{...recentTab, dashboard: {activityType: 'recent', activityLimit: 1}}} activity={{status: ''}} activityData={activityData} />
    ));
