import React from 'react';
import {storiesOf} from '@storybook/react';
import ModalDiffDetail from './modal-diff-detail';

storiesOf('ModalDiffDetail', module).add('default', () => (
  <ModalDiffDetail diffImageUrl="http://placehold.it/1280x1024" />
));
