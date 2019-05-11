import React from 'react';
import { storiesOf } from '@storybook/react';
import StateScreenshot from './state-screenshot';

const ui = {
  stateDetail: {
    showDiff: true
  }
};

storiesOf('StateScreenshot', module)
    .add('default', () => (
      <StateScreenshot
        ui={ui}
        label="Current"
        imageUrl="http://placehold.it/1024x768"
        changesData={{changes: []}}
        side="right"
      />
    ))
    .add('full size', () => (
      <StateScreenshot
        ui={ui}
        label="Current"
        imageUrl="http://placehold.it/1024x768"
        isFullSize={true}
        changesData={{changes: []}}
        side="right"
      />
    ));
