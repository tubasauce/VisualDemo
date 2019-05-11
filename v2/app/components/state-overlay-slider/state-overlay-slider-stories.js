import React from 'react';
import { storiesOf } from '@storybook/react';
import StateOverlaySlider from './state-overlay-slider';

const ui = {
  stateDetail: {
    overlay: 50
  }
};

storiesOf('StateOverlaySlider', module)
    .add('default', () => (
      <StateOverlaySlider ui={ui} />
    ));
