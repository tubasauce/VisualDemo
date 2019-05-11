import React from 'react';
import { storiesOf } from '@storybook/react';
import StateOverlay from './state-overlay';

const ui = {
  stateDetail: {
    overlay: 100
  }
};
const stateData = {
  currentUrl: 'http://placehold.it/1024x768',
  referenceUrl: 'http://placehold.it/1024x768'
};

storiesOf('StateOverlay', module)
    .add('default', () => (
      <div id="state">
        <StateOverlay ui={ui} stateData={stateData} />
      </div>
    ));
