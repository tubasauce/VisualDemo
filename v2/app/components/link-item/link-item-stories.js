import React from 'react';
import { storiesOf } from '@storybook/react';
import LinkItem from './link-item';

storiesOf('LinkItem', module)
    .add('default', () => (
      <LinkItem to="path">Link</LinkItem>
    ))
    .add('active', () => (
      <LinkItem to="path" isActive>Link</LinkItem>
    ));
