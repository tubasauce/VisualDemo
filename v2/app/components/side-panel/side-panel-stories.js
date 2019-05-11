import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import SidePanel from './side-panel';

const ui = {
  stateDetail: {
    sideType: 'changes',
    overlay: 100
  }
};
const stateData = {
  referenceUrl: 'path/to/reference.png'
};

storiesOf('SidePanel', module)
    .add('closed', () => (
      <div id="state">
        <SidePanel
            ui={ui}
            changes={{status: 'loading'}}
            changesData={{}} />
      </div>
    ))
    .add('open', () => (
      <div id="state">
        <SidePanel
            ui={ui}
            isOpen={true}
            changes={{status: 'loading'}}
            changesData={{}} />
      </div>
    ))
    .add('overlay', () => (
      <div id="state">
        <SidePanel
            ui={{
              stateDetail: {
                sideType: 'overlay'
              }
            }}
            isOpen={true}
            changes={{status: 'loading'}}
            changesData={{}}
            stateData={stateData} />
      </div>
    ))
    .add('history', () => (
      <div id="state">
        <SidePanel
            ui={{
              stateDetail: {
                sideType: 'history'
              }
            }}
            isOpen={true}
            history={{status: 'loading'}}
            historyData={{}} />
      </div>
    ));
