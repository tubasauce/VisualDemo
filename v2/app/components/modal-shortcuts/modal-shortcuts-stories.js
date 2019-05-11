import React from 'react';
import { storiesOf } from '@storybook/react';
import ModalShortcuts from './modal-shortcuts';

storiesOf('ModalShortcuts', module)
    .add('default', () => (
      <ModalShortcuts isOpen />
    ));
