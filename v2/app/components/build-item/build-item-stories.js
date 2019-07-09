import React from 'react';
import { storiesOf } from '@storybook/react';
import BuildItem from './build-item';

const now = new Date().getTime();
const day = 24 * 60 * 60 * 1000;
const start = new Date(now - day).toISOString();
const end = new Date(now - day + (60 * 1000)).toISOString();

const projectData = {
  maxConcurrent: 8
};
const runningContainers = [
  {
    status: 'running'
  }
];
const containers = [
  {
    status: 'complete',
    name: 'Chrome',
    resolution: '1280x1024',
    logUrl: 'log-url',
    start: start
  }
];

storiesOf('BuildItem', module)
    .add('queued', () => (
      <BuildItem
        projectData={projectData}
        branch="master"
        build="108"
        status="queued"
        start={start}
        containers={containers}
        user={{}} />
    ))
    .add('running', () => (
      <BuildItem
        projectData={projectData}
        branch="master"
        build="108"
        status="running"
        start={start}
        containers={runningContainers}
        user={{}} />
    ))
    .add('failure', () => (
      <BuildItem
        projectData={projectData}
        branch="master"
        build="108"
        status="failure"
        start={start}
        containers={containers}
        user={{}} />
    ))
    .add('success', () => (
      <BuildItem
        projectData={projectData}
        branch="master"
        build="108"
        status="success"
        start={start}
        end={end}
        containers={containers}
        user={{}} />
    ))
    .add('error', () => (
      <BuildItem
        projectData={projectData}
        branch="master"
        build="108"
        status="error"
        start={start}
        containers={containers}
        user={{}} />
    ))
    .add('cancelled', () => (
      <BuildItem
        projectData={projectData}
        branch="master"
        build="108"
        status="cancelled"
        start={start}
        containers={containers}
        user={{}} />
    ))
    .add('max 8 parallelism', () => (
      <BuildItem
        projectData={projectData}
        branch="master"
        build="108"
        status="running"
        start={start}
        containers={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
        user={{}} />
    ))
    .add('show containers', () => (
      <BuildItem
        projectData={projectData}
        branch="master"
        build="108"
        status="success"
        start={start}
        end={end}
        showContainers={true}
        containers={containers}
        user={{}}
        />
    ))
    .add('show screenshots', () => (
      <BuildItem
        projectData={projectData}
        branch="master"
        build="108"
        status="success"
        start={start}
        end={end}
        showScreenshots={true}
        containers={containers}
        user={{}}
        />
    ))
    .add('github commit', () => (
      <BuildItem
        projectData={projectData}
        branch="master"
        build="108"
        status="success"
        start={start}
        end={end}
        containers={containers}
        githubCommitUrl="github-url"
        user={{}} />
    ))
    .add('no user', () => (
      <BuildItem
        projectData={projectData}
        branch="master"
        build="108"
        status="running"
        start={start}
        containers={runningContainers} />
    ));
