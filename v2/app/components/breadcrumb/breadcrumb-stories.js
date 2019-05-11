import React from 'react';
import { storiesOf } from '@storybook/react';
import Breadcrumb from './breadcrumb';

const values = ['ProjectRepo', 'Branch', 'Resolution', 'Browser'];

storiesOf('Breadcrumb', module)
    .add('default', () => (
      <Breadcrumb values={values} />
    ))
    .add('large', () => (
      <Breadcrumb values={values} priority={4} />
    ));
