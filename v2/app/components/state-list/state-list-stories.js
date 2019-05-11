import React from 'react';
import { storiesOf } from '@storybook/react';
import StateList from './state-list';
import Overlay from '../overlay/overlay';

const projectData = {
  projectRepo: 'projectRepo',
  role: 'tester'
};
const ui = {
  selected: {
    branch: 'branch'
  },
  statesFilterBy: {
  },
  showSections: {
    stateA: true,
    stateB: false
  }
};
const uiAllFilters = {
  ...ui,
  statesFilterBy: {
    changed: true,
    new: true,
    accepted: true,
    rejected: true
  }
};
const statesTotals = {
  changed: 0,
  new: 0,
  accepted: 0,
  rejected: 0
};
const statesGroupedData = [
  {
    resolution: '1024x768',
    testName: 'Chrome',
    states: [
      {
        status: 'changed',
        thumbnailUrl: 'http://placehold.it/240x120',
        name: 'State A: Name'
      },
      {
        status: 'new',
        thumbnailUrl: 'http://placehold.it/240x120',
        name: 'State A: Name'
      },
      {
        status: 'accepted',
        thumbnailUrl: 'http://placehold.it/240x120',
        name: 'State B: Name'
      },
      {
        status: 'rejected',
        thumbnailUrl: 'http://placehold.it/240x120',
        name: 'State B: Name'
      }
    ]
  }
];
const reviewedStatesGroupedData = [
  {
    resolution: '1024x768',
    testName: 'Chrome',
    states: [
      {
        status: 'accepted',
        thumbnailUrl: 'http://placehold.it/240x120',
        name: 'State Name',
        isReviewed: true,
        userName: 'someone'
      },
      {
        status: 'rejected',
        thumbnailUrl: 'http://placehold.it/240x120',
        name: 'State Name',
        isReviewed: true,
        userName: 'someone'
      }
    ]
  }
];

storiesOf('StateList', module)
    .add('loading', () => (
      <Overlay show>
        <StateList
          ui={ui}
          states={{status: 'loading'}}
          projectData={projectData}
          statesTotals={statesTotals}
          statesGroupedData={[]}
        />
      </Overlay>
    ))
    .add('empty', () => (
      <Overlay show>
        <StateList
          ui={ui}
          states={{status: ''}}
          projectData={projectData}
          statesTotals={statesTotals}
          statesGroupedData={[]}
          isAllAccepted={true}
        />
      </Overlay>
    ))
    .add('all filters', () => (
      <Overlay show>
        <StateList
          ui={uiAllFilters}
          states={{status: ''}}
          projectData={projectData}
          statesTotals={statesTotals}
          statesGroupedData={[]}
          isAllAccepted={true}
        />
      </Overlay>
    ))
    .add('list', () => (
      <Overlay show>
        <StateList
          ui={uiAllFilters}
          states={{status: ''}}
          projectData={projectData}
          statesTotals={{
            changed: 1,
            new: 1,
            accepted: 1,
            rejected: 1
          }}
          statesGroupedData={statesGroupedData}
        />
      </Overlay>
    ))
    .add('reviewed', () => (
      <Overlay show>
        <StateList
          ui={{
            ...uiAllFilters,
            statesFilterBy: {
              changed: false,
              new: false,
              accepted: true,
              rejected: true,
              reviewed: true
            }
          }}
          states={{status: ''}}
          projectData={{
            ...projectData,
            totalReviewed: 2
          }}
          statesTotals={{
            changed: 0,
            new: 0,
            accepted: 1,
            rejected: 1
          }}
          statesGroupedData={reviewedStatesGroupedData}
        />
      </Overlay>
    ))
    .add('not tester', () => (
      <Overlay show>
        <StateList
          ui={uiAllFilters}
          states={{status: ''}}
          projectData={{...projectData, role: 'viewer'}}
          statesTotals={{
            changed: 1,
            new: 1,
            accepted: 1,
            rejected: 1
          }}
          statesGroupedData={statesGroupedData}
        />
      </Overlay>
    ))
    .add('sections', () => (
      <Overlay show>
        <StateList
          ui={uiAllFilters}
          states={{status: ''}}
          projectData={{...projectData, role: 'viewer'}}
          statesTotals={{
            changed: 1,
            new: 1,
            accepted: 1,
            rejected: 1
          }}
          statesGroupedData={[{
            ...statesGroupedData[0],
            sections: [
              {name: 'State A', _id: 'stateA'},
              {name: 'State B', _id: 'stateB'}
            ]
          }]}
        />
      </Overlay>
    ))
    .add('sections with accept states', () => (
      <Overlay show>
        <StateList
          ui={uiAllFilters}
          states={{status: ''}}
          projectData={{...projectData, role: 'tester'}}
          statesTotals={{
            changed: 1,
            new: 1,
            accepted: 1,
            rejected: 1
          }}
          statesGroupedData={[{
            ...statesGroupedData[0],
            sections: [
              {name: 'State A', _id: 'stateA'},
              {name: 'State B', _id: 'stateB'}
            ]
          }]}
        />
      </Overlay>
    ));
