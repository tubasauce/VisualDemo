import React from 'react';
import { storiesOf } from '@storybook/react';
import ProjectItem from './project-item';
import List from '../list/list';

const now = new Date().getTime();
const day = 24 * 60 * 60 * 1000;
const oneDayAgo = new Date(now - day).toString();

storiesOf('ProjectItem', module)
    .add('statuses', () => (
      <List>
        <ProjectItem
          projectRepo="user/my-project-repo"
          branch="master"
          status="pending"
          start={oneDayAgo}
          isActive
        />
        <ProjectItem
          projectRepo="user/my-project-repo"
          branch="master"
          status="success"
          start={oneDayAgo}
        />
        <ProjectItem
          projectRepo="user/my-project-repo"
          branch="master"
          status="failure"
          start={oneDayAgo}
        />
      </List>
    ));
