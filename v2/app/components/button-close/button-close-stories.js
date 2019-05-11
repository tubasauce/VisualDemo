import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ButtonClose from './button-close';

storiesOf('ButtonClose', module)
    .add('default', () => (
      <div>
        <ButtonClose label="close" onClick={action('onClick')} />
        <ButtonClose label="close" isLite onClick={action('onClick')} />
      </div>
    ));
