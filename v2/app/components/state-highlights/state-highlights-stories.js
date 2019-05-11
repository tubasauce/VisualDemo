import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import StateHighlights from './state-highlights';
import Overlay from '../overlay/overlay';

const changesData = {
  leftSize: {
    width: 500,
    height: 500
  },
  rightSize: {
    width: 500,
    height: 500
  },
  changes: [
    {
      leftCoords: {
        top: 20,
        left: 10,
        width: 300,
        height: 21
      },
      text: true,
      id: 1
    },
    {
      leftCoords: {
        top: 150,
        left: 200,
        width: 130,
        height: 44
      },
      dom: 'insert',
      id: 2
    },
    {
      leftCoords: {
        top: 150,
        left: 10,
        width: 130,
        height: 44
      },
      dom: 'delete',
      id: 3
    },
    {
      leftCoords: {
        top: 60,
        left: 10,
        width: 300,
        height: 21
      },
      css: true,
      id: 4
    },
    {
      leftCoords: {
        top: 100,
        left: 10,
        width: 300,
        height: 21
      },
      layout: true,
      id: 5
    }
  ]
};
const options = {
  side: 'left',
  show: {
    dom: true,
    layout: true,
    css: true,
    content: true
  },
  openSidePanel: action('openSidePanel')
};

storiesOf('StateHighlights', module)
    .add('default', () => (
      <Overlay show>
        <StateHighlights
          data={changesData}
          options={options}
          width={10}
          height={10}
        />
      </Overlay>
    ))
    .add('dom only', () => (
      <Overlay show>
        <StateHighlights
          data={changesData}
          options={{
            ...options,
            show: {dom: true, layout: false, css: false, content: false}
          }}
          width={10}
          height={10}
        />
      </Overlay>
    ))
    .add('layout only', () => (
      <Overlay show>
        <StateHighlights
          data={changesData}
          options={{
            ...options,
            show: {dom: false, layout: true, css: false, content: false}
          }}
          width={10}
          height={10}
        />
      </Overlay>
    ))
    .add('css only', () => (
      <Overlay show>
        <StateHighlights
          data={changesData}
          options={{
            ...options,
            show: {dom: false, layout: false, css: true, content: false}
          }}
          width={10}
          height={10}
        />
      </Overlay>
    ))
    .add('content only', () => (
      <Overlay show>
        <StateHighlights
          data={changesData}
          options={{
            ...options,
            show: {dom: false, layout: false, css: false, content: true}
          }}
          width={10}
          height={10}
        />
      </Overlay>
    ));
