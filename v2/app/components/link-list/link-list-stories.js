import React from 'react';
import { storiesOf } from '@storybook/react';
import LinkList from './link-list';
import LinkItem from '../link-item/link-item';
import LinkHeading from '../link-heading/link-heading';

storiesOf('LinkList', module)
    .add('default', () => (
      <LinkList location={{pathname: 'path1'}}>
        <LinkItem to="path1">Link 1</LinkItem>
        <LinkItem to="path2">Link 2</LinkItem>
      </LinkList>
    ))
    .add('with heading', () => (
      <LinkList location={{pathname: 'path1'}}>
        <LinkHeading>Heading</LinkHeading>
        <LinkItem to="path1" indent>Link 1</LinkItem>
        <LinkItem to="path2" indent>Link 2</LinkItem>
      </LinkList>
    ));
