import React from 'react';
import { storiesOf } from '@storybook/react';
import ApiKey from './api-key';

storiesOf('ApiKey', module)
  .add('loading', () => (
    <ApiKey
        account={{status: 'loading'}}
        accountData={{}}
        accounts={{status: 'loading'}}
        accountsData={[]} />
  ))
  .add('default', () => (
    <ApiKey
        account={{status: ''}}
        accountData={{apiKey: 'API-KEY-XXXX'}}
        accounts={{status: '' }}
        accountsData={[]} />
  ))
  .add('not owner', () => (
    <ApiKey
        account={{status: ''}}
        accountData={{apiKey: 'API-KEY-XXXX'}}
        accounts={{status: '' }}
        accountsData={[{apiKey: 'API-OTHER-KEY'}]} />
  ));
