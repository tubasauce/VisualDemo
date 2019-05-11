import React from 'react';
import { storiesOf } from '@storybook/react';
import BuildContainerItem from './build-container-item';
import List from '../list/list';

const now = new Date().getTime();
const day = 24 * 60 * 60 * 1000;
const start = new Date(now - day).toISOString();
const end = new Date(now - day + (60 * 1000)).toISOString();

const container = {
  name: 'Chrome',
  resolution: '1280x1024',
  start: start
};

storiesOf('BuildContainerItem', module)
    .add('queued', () => (
      <List>
        <BuildContainerItem
          status="queued"
          {...container}
        />
      </List>
    ))
    .add('running', () => (
      <List>
        <BuildContainerItem
          status="running"
          {...container}
        />
        <BuildContainerItem
          status="processing"
          {...container}
        />
        <BuildContainerItem
          status="ready"
          {...container}
        />
      </List>
    ))
    .add('complete', () => (
      <List>
        <BuildContainerItem
          status="complete"
          logUrl="log-url"
          end={end}
          {...container}
        />
      </List>
    ))
    .add('error', () => (
      <List>
        <BuildContainerItem
          status="error"
          logUrl="log-url"
          end={end}
          {...container}
        />
        <BuildContainerItem
          status="timeout"
          logUrl="log-url"
          logScreenshotUrl="screenshot-url"
          end={end}
          {...container}
        />
      </List>
    ));
