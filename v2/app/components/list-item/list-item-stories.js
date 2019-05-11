import React from 'react';
import { storiesOf } from '@storybook/react';
import ListItem from './list-item';
import List from '../list/list';

storiesOf('ListItem', module)
    .add('default', () => (
      <List>
        <ListItem isActive>active</ListItem>
        <ListItem>not active</ListItem>
      </List>
    ))
    .add('statuses', () => (
      <List>
        <ListItem status="queued">queued</ListItem>
        <ListItem status="running">running</ListItem>
        <ListItem status="pending">pending</ListItem>
        <ListItem status="failure">failure</ListItem>
        <ListItem status="success">success</ListItem>
        <ListItem status="cancelled">cancelled</ListItem>
      </List>
    ));
