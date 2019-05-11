import React from 'react';
import { storiesOf } from '@storybook/react';
import SideNav from './side-nav';

storiesOf('SideNav', module)
    .add('default', () => (
      <div id="state">
        <SideNav isOpen={false} />
      </div>
    ))
    .add('open', () => (
      <div id="state">
        <SideNav
            isOpen={true}
            stateData={{
              resolution: '1024x768',
              testName: 'Chrome',
              _id: 'state-id',
              name: 'Body'
            }}
            statesGroupedData={[
              {
                resolution: '1024x768',
                testName: 'Chrome',
                states: [
                  {
                    _id: 'state-id',
                    name: 'Header'
                  },
                  {
                    _id: 'state-id-2',
                    name: 'Footer'
                  }
                ]
              }
            ]}
        />
      </div>
    ))
    .add('sections', () => (
      <div id="state">
        <SideNav
            isOpen={true}
            stateData={{
              resolution: '1024x768',
              testName: 'Chrome',
              _id: 'state-id',
              name: 'Body: default'
            }}
            statesGroupedData={[
              {
                resolution: '1024x768',
                testName: 'Chrome',
                sections: [
                  {name: 'Header'},
                  {name: 'Body'},
                  {name: 'Footer'}
                ],
                states: [
                  {
                    _id: 'state-id',
                    name: 'Body: default'
                  },
                  {
                    _id: 'state-id-2',
                    name: 'Body: alt'
                  }
                ]
              }
            ]}
        />
      </div>
    ));
