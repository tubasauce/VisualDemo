import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import StatusDropdown from './status-dropdown';

storiesOf('StatusDropdown', module)
    .add('closed', () => (
      <StatusDropdown status="changed" onToggleOpen={action('onToggleOpen')} />
    ))
    .add('reviewed', () => (
      <StatusDropdown status="accepted" isReviewed={true} userName="someone" isAutoAccepted={true} branch="branch"  />
    ))
    .add('auto-accepted', () => (
      <StatusDropdown status="accepted" isAutoAccepted={true} branch="branch"  />
    ))
    .add('open', () => (
      <StatusDropdown isOpen={true} status="changed" onToggleOpen={action('onToggleOpen')} />
    ))
    .add('disabled option', () => (
      <StatusDropdown isOpen={true} status="accepted" />
    ))
    .add('statuses', () => (
      <div>
        <StatusDropdown status="changed" />
        <StatusDropdown status="new" />
        <StatusDropdown status="accepted" />
        <StatusDropdown status="rejected" />
      </div>
    ));
