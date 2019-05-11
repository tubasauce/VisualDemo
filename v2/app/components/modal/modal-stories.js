import React from 'react';
import {storiesOf} from '@storybook/react';
import Modal from './modal';

storiesOf('Modal', module)
  .add('open', () => (
    <Modal isOpen title="Title">
      Body Content
    </Modal>
  ))
  .add('full screen', () => (
    <Modal isOpen title="Title" isFullScreen>
      Body Content
    </Modal>
  ))
  .add('closed', () => (
    <Modal isOpen={false} title="Title">
      Body Content
    </Modal>
  ));
