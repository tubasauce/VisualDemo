import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import StateDetail from './state-detail';
import Overlay from '../overlay/overlay';

const projectData = {
  projectRepo: 'projectRepo',
  role: 'tester',
  latestBuild: {}
};
const ui = {
  selected: {
    branch: 'branch'
  },
  stateDetail: {},
  prefs: {},
  modal: {}
};
const currentStateData = {
  name: 'State Name',
  resolution: '1024x768',
  testName: 'Chrome',
  status: 'accepted',
  currentUrl: 'http://placehold.it/1024x768'
};
const referenceStateData = {
  name: 'State Name',
  resolution: '1024x768',
  testName: 'Chrome',
  status: 'accepted',
  currentUrl: 'http://placehold.it/1024x768',
  referenceUrl: 'http://placehold.it/1024x768'
};
const statesData = [referenceStateData];
const handlers = {
  onClose: action('onClose'),
  onSelectState: action('onSelectState'),
  onToggleUI: action('onToggleUI'),
  onStatusChange: action('onStatusChange')
};

storiesOf('StateDetail', module)
    .add('current', () => (
      <Overlay show>
        <StateDetail
          ui={ui}
          projectData={projectData}
          stateData={currentStateData}
          statesData={statesData}
          stateIndex={0}
          changes={{status: ''}}
          changesData={{changes: []}}
          changesGroupedData={[]}
          {...handlers}
        />
      </Overlay>
    ))
    .add('reference', () => (
      <Overlay show>
        <StateDetail
          ui={ui}
          projectData={projectData}
          stateData={referenceStateData}
          statesData={statesData}
          stateIndex={0}
          changes={{status: ''}}
          changesData={{changes: []}}
          changesGroupedData={[]}
          {...handlers}
        />
      </Overlay>
    ))
    .add('overlay', () => (
      <Overlay show>
        <StateDetail
          ui={{
            ...ui,
            stateDetail: {
              sideType: 'overlay'
            }
          }}
          projectData={projectData}
          stateData={referenceStateData}
          statesData={statesData}
          stateIndex={0}
          changes={{status: ''}}
          changesData={{changes: []}}
          changesGroupedData={[]}
          {...handlers}
        />
      </Overlay>
    ))
    .add('current full size', () => (
      <Overlay show>
        <StateDetail
          ui={{
            ...ui,
            stateDetail: {
              currentFullSize: true
            }
          }}
          projectData={projectData}
          stateData={referenceStateData}
          statesData={statesData}
          stateIndex={0}
          changes={{status: ''}}
          changesData={{changes: []}}
          changesGroupedData={[]}
          {...handlers}
        />
      </Overlay>
    ))
    .add('reference full size', () => (
      <Overlay show>
        <StateDetail
          ui={{
            ...ui,
            stateDetail: {
              referenceFullSize: true
            }
          }}
          projectData={projectData}
          stateData={referenceStateData}
          statesData={statesData}
          stateIndex={0}
          changes={{status: ''}}
          changesData={{changes: []}}
          changesGroupedData={[]}
          {...handlers}
        />
      </Overlay>
    ))
    .add('not tester', () => (
      <Overlay show>
        <StateDetail
          ui={ui}
          projectData={{...projectData, role: 'viewer'}}
          stateData={referenceStateData}
          statesData={statesData}
          stateIndex={0}
          changes={{status: ''}}
          changesData={{changes: []}}
          changesGroupedData={[]}
          {...handlers}
        />
      </Overlay>
    ));
