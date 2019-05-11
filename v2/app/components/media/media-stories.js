import React from 'react';
import { storiesOf } from '@storybook/react';
import Media from './media';

storiesOf('Media', module)
    .add('default', () => (
      <Media icon="success">
        Success
      </Media>
    ))
    .add('right side', () => (
      <Media icon="success" side="right">
        Success
      </Media>
    ))
    .add('custom object', () => (
      <Media object="custom">
        Success
      </Media>
    ))
    .add('vertically centered', () => (
      <Media icon="success" align="center">
        <div>line 1</div>
        <div>line 2</div>
        <div>line 3</div>
      </Media>
    ));
