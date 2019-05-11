import React from 'react';
import { storiesOf } from '@storybook/react';
import LoaderItem from './loader-item';

storiesOf('LoaderItem', module)
    .add('loading', () => (
      <LoaderItem request={{status: 'loading'}} />
    ))
    .add('error', () => (
      <LoaderItem request={{status: 'error-loading', errorMessage: 'error message'}} />
    ))
    .add('loaded', () => (
      <LoaderItem request={{status: ''}} />
    ));
