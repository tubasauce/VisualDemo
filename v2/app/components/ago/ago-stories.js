import React from 'react';
import { storiesOf } from '@storybook/react';
import Ago from './ago';

const now = new Date().getTime();
const second = 1000;
const minute = 60 * second;
const hour = 60 * minute;
const day = 24 * hour;

storiesOf('Ago', module)
    .add('times', () => (
      <div>
        <Ago date={new Date(now - (10 * second)).toString()} />
        <br/>
        <Ago date={new Date(now - (10 * minute)).toString()} />
        <br/>
        <Ago date={new Date(now - (10 * hour)).toString()} />
        <br/>
        <Ago date={new Date(now - (2 * day)).toString()} />
        <br/>
        <Ago date={new Date(now - (7 * day)).toString()} />
        <br/>
        <Ago date={new Date(now - (30 * day)).toString()} />
        <br/>
        <Ago date={new Date(now - (365 * day)).toString()} />
      </div>
    ));
