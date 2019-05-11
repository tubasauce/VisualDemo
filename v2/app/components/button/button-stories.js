import React from 'react';
import { storiesOf } from '@storybook/react';
import Button from './button';

storiesOf('Button', module)
    .add('default', () => (
      <Button>Hello</Button>
    ))
    .add('primary', () => (
      <Button type="primary">Hello</Button>
    ))
    .add('icon', () => (
      <Button icon="plus" />
    ))
    .add('icon with text', () => (
      <Button icon="plus">Add</Button>
    ))
    .add('sizes', () => (
      <div>
        <Button size="sm">Hello</Button>
        <Button size="md">Hello</Button>
        <Button size="lg">Hello</Button>
      </div>
    ))
    .add('border', () => (
      <Button border>Hello</Button>
    ))
    .add('active', () => (
      <Button isActive>Hello</Button>
    ))
    .add('disabled', () => (
      <Button isDisabled>Hello</Button>
    ));
