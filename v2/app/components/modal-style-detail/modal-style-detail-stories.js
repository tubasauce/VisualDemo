import React from 'react';
import { storiesOf } from '@storybook/react';
import ModalStyleDetail from './modal-style-detail';

storiesOf('ModalStyleDetail', module)
    .add('default', () => (
      <ModalStyleDetail changes={[
        {
          name: 'color',
          type: 'replace',
          left: '#666',
          right: 'black'
        },
        {
          name: 'padding-left',
          type: 'insert',
          right: '15px'
        },
        {
          name: 'background-color',
          type: 'delete',
          left: 'rgb(238, 238, 238)'
        }
      ]} />
    ));
