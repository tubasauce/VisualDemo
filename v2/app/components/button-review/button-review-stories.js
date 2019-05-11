import React from 'react';
import { storiesOf } from '@storybook/react';
import ButtonReview from './button-review';

storiesOf('ButtonReview', module)
    .add('has changed', () => (
      <ButtonReview totals={{changed: 20, new: 0}} />
    ))
    .add('has new', () => (
      <ButtonReview totals={{changed: 0, new: 5}} />
    ))
    .add('has changed & new', () => (
      <ButtonReview totals={{changed: 20, new: 5}} />
    ))
    .add('nothing to review', () => (
      <ButtonReview totals={{changed: 0, new: 0}} />
    ));
