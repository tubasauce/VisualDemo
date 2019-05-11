import React from 'react';
import { storiesOf } from '@storybook/react';
import Icon from './icon';

storiesOf('Icon', module)
    .add('default', () => (
      <div>
        <Icon type="queued" />
        <Icon type="running" />
        <Icon type="pending" />
        <Icon type="success" />
        <Icon type="failure" />
        <Icon type="cancelled" />
        <Icon type="plus" />
        <Icon type="cog" />
        <Icon type="time" />
        <Icon type="trash" />
        <Icon type="github" />
      </div>
    ))
    .add('label', () => (
      <Icon type="time" label="duration" />
    ));
