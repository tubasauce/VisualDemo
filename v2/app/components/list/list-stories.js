import React from 'react';
import { storiesOf } from '@storybook/react';
import List from './list';
import ListItem from '../list-item/list-item';

storiesOf('List', module)
    .add('default', () => (
      <List>
        <ListItem>item 1</ListItem>
        <ListItem>item 2</ListItem>
        <ListItem>item 3</ListItem>
      </List>
    ))
    .add('sub list', () => (
      <List>
        <ListItem>item 1</ListItem>
        <ListItem>item 2</ListItem>
        <List className="sub-list">
          <ListItem>sub-item 1</ListItem>
          <ListItem>sub-item 2</ListItem>
        </List>
        <ListItem>item 3</ListItem>
      </List>
    ))
    .add('sub list bottom', () => (
      <List>
        <ListItem>item 1</ListItem>
        <ListItem>item 2</ListItem>
        <List className="sub-list-bottom">
          <ListItem>sub-item 1</ListItem>
          <ListItem>sub-item 2</ListItem>
        </List>
      </List>
    ));
