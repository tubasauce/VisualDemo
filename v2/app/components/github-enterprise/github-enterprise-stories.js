import React from 'react';
import { storiesOf } from '@storybook/react';
import GithubEnterprise from './github-enterprise';

storiesOf('GithubEnterprise', module)
  .add('loading', () => (
    <GithubEnterprise integration={{status: 'loading'}} />
  ))
  .add('not integrated', () => (
    <GithubEnterprise integration={{status: ''}} integrationData={{}} ui={{integration: {}}} />
  ))
  .add('validation', () => (
    <GithubEnterprise
      integration={{status: ''}}
      integrationData={{}}
      ui={{integration: {
        isSubmitted: true
      }}}
    />
  ))
  .add('is integrated', () => (
    <GithubEnterprise integration={{status: ''}} integrationData={{user: {login: 'username'}, appUrl: 'app-url'}} />
  ));
