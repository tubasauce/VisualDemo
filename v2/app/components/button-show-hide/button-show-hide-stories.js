import React from 'react';
import { storiesOf } from '@storybook/react';
import ButtonShowHide from './button-show-hide';

storiesOf('ButtonShowHide', module)
    .add('open', () => (
      <ButtonShowHide show={true} label="Stuff" />
    ))
    .add('closed', () => (
      <ButtonShowHide show={false} label="Stuff" />
    ))
    .add('no prefix', () => (
      <ButtonShowHide show={false} label="Stuff" prefix={false} />
    ));
