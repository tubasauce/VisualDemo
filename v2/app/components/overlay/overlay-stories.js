import React from 'react';
import { storiesOf } from '@storybook/react';
import Overlay from './overlay';

storiesOf('Overlay', module)
    .add('show', () => (
      <Overlay show={true}>
        <div className="white">
          Content in Overlay
        </div>
      </Overlay>
    ))
    .add('hide', () => (
      <Overlay show={false}>
        <div className="white">
          Content in Overlay
        </div>
      </Overlay>
    ));
