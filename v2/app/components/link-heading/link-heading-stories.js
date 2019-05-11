import React from 'react';
import { storiesOf } from '@storybook/react';
import LinkHeading from './link-heading';

storiesOf('LinkHeading', module)
    .add('default', () => (
      <LinkHeading>Heading</LinkHeading>
    ));
