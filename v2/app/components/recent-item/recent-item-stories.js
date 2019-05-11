import React from 'react';
import { storiesOf } from '@storybook/react';
import RecentItem from './recent-item';
import List from '../list/list';

const now = new Date().getTime();
const day = 24 * 60 * 60 * 1000;
const oneDayAgo = new Date(now - day).toString();

storiesOf('RecentItem', module)
    .add('statuses', () => (
      <List>
        <RecentItem
          projectRepo="user/my-project-repo"
          branch="master"
          build="108"
          status="pending"
          start={oneDayAgo}
          isActive
        />
        <RecentItem
          projectRepo="user/my-project-repo"
          branch="master"
          build="108"
          status="success"
          start={oneDayAgo}
        />
        <RecentItem
          projectRepo="user/my-project-repo"
          branch="master"
          build="108"
          status="failure"
          start={oneDayAgo}
        />
        <RecentItem
          projectRepo="user/my-project-repo"
          branch="master"
          build="108"
          status="cancelled"
          start={oneDayAgo}
        />
      </List>
    ));
