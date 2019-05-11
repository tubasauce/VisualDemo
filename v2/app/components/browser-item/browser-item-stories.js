import React from 'react';
import { storiesOf } from '@storybook/react';
import BrowserItem from './browser-item';

const totals = {
  changed: 20,
  new: 5,
  accepted: 132,
  rejected: 0
};
const updatedAt = new Date(new Date().setDate(new Date().getDate() - 1)).toISOString();

storiesOf('BrowserItem', module)
    .add('chrome', () => (
      <BrowserItem
        browserName="chrome"
        name="Chrome"
        resolution="1024x768"
        totals={totals}
        updatedAt={updatedAt}
        />
    ))
    .add('firefox', () => (
      <BrowserItem
        browserName="firefox"
        name="Firefox 53.0"
        resolution="1024x768"
        totals={totals}
        updatedAt={updatedAt}
        />
    ))
    .add('safari', () => (
      <BrowserItem
        browserName="safari"
        name="Safari 10.0"
        resolution="1024x768"
        totals={totals}
        updatedAt={updatedAt}
        />
    ))
    .add('edge', () => (
      <BrowserItem
        browserName="microsoftedge"
        name="Microsoft Edge 14.14393"
        resolution="1024x768"
        totals={totals}
        updatedAt={updatedAt}
        />
    ))
    .add('ie11', () => (
      <BrowserItem
        browserName="internet explorer"
        name="Internet Explorer 11.103"
        resolution="1024x768"
        totals={totals}
        updatedAt={updatedAt}
        />
    ))
    .add('device emulation', () => (
      <BrowserItem
        browserName="chrome"
        name="iPhone 6"
        resolution="375x667"
        totals={totals}
        updatedAt={updatedAt}
        />
    ))
    .add('no browser', () => (
      <BrowserItem
        name="Custom Platform"
        resolution="1280x1024"
        totals={totals}
        updatedAt={updatedAt}
        />
    ));
