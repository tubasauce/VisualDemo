import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Pager from './pager';

storiesOf('Pager', module)
    .add('empty', () => (
      <Pager />
    ))
    .add('start', () => (
      <Pager index={0} total={10} onPrev={action('onPrev')} onNext={action('onNext')} />
    ))
    .add('mid', () => (
      <Pager index={4} total={10} onPrev={action('onPrev')} onNext={action('onNext')} />
    ))
    .add('end', () => (
      <Pager index={9} total={10} onPrev={action('onPrev')} onNext={action('onNext')} />
    ));
