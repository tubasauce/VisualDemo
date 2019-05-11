import React from 'react';
import { storiesOf } from '@storybook/react';
import Tags from './tags';

storiesOf('Tags', module)
    .add('default', () => (
      <Tags values={['1280x1024', 'Chrome']} />
    ));
