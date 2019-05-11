import React from 'react';
import { storiesOf } from '@storybook/react';
import Wizard from './wizard';

storiesOf('Wizard', module)
    .add('first step', () => (
      <Wizard stepIndex={0}>
        <div>Step 1</div>
        <div>Step 2</div>
        <div>Step 3</div>
      </Wizard>
    ))
    .add('middle step', () => (
      <Wizard stepIndex={1}>
        <div>Step 1</div>
        <div>Step 2</div>
        <div>Step 3</div>
      </Wizard>
    ))
    .add('last step', () => (
      <Wizard stepIndex={2}>
        <div>Step 1</div>
        <div>Step 2</div>
        <div>Step 3</div>
      </Wizard>
    ));
