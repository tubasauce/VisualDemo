import React from 'react';
import { storiesOf } from '@storybook/react';
import ChangeList from './change-list';

const groups = [
  {
    name: 'Structure',
    type: 'dom',
    changes: [
      {tagName: 'div', dom: 'insert'},
      {tagName: 'div', dom: 'delete'}
    ]
  },
  {
    name: 'Layout',
    type: 'layout',
    changes: [{
      tagName: 'div',
      layout: {
        top: 100,
        left: 100,
        width: 100
      }
    }]
  },
  {
    name: 'Style',
    type: 'css',
    changes: [
      {
        tagName: 'div',
        css: [{name: 'font-family'}, {name: 'font-size'}]
      }
    ]
  },
  {
    name: 'Content',
    type: 'content',
    changes: [
      {
        tagName: 'img',
        media: [{name: 'src'}]
      },
      {
        tagName: 'img',
        text: [{value: 'hello', type: 'insert'}, {value: 'bonjour', type: 'delete'}, {value: 'world', type: 'equal'}]
      }
    ]
  }
];

storiesOf('ChangeList', module)
    .add('loading', () => (
      <ChangeList
        ui={{}}
        projectData={{}}
        changesData={{}}
        changesGroupedData={[]}
        changes={{status: 'loading'}}
        stateData={{}}
      />
    ))
    .add('no changes', () => (
      <ChangeList
        ui={{}}
        projectData={{}}
        changesData={{
          changes: []
        }}
        changesGroupedData={[]}
        changes={{status: ''}}
        stateData={{}}
      />
    ))
    .add('dom changes', () => (
      <ChangeList
        ui={{
          stateDetail: {
            dom: true
          }
        }}
        projectData={{}}
        changesData={{
          changes: [{}]
        }}
        changesGroupedData={[
          groups[0],
          {...groups[1], changes: []},
          {...groups[2], changes: []},
          {...groups[3], changes: []}
        ]}
        changes={{status: ''}}
        stateData={{}}
      />
    ))
    .add('layout changes', () => (
      <ChangeList
        ui={{
          stateDetail: {
            layout: true
          }
        }}
        projectData={{}}
        changesData={{
          changes: [{}]
        }}
        changesGroupedData={[
          {...groups[0], changes: []},
          groups[1],
          {...groups[2], changes: []},
          {...groups[3], changes: []}
        ]}
        changes={{status: ''}}
        stateData={{}}
      />
    ))
    .add('css changes', () => (
      <ChangeList
        ui={{
          stateDetail: {
            css: true
          }
        }}
        projectData={{}}
        changesData={{
          changes: [{}]
        }}
        changesGroupedData={[
          {...groups[0], changes: []},
          {...groups[1], changes: []},
          groups[2],
          {...groups[3], changes: []}
        ]}
        changes={{status: ''}}
        stateData={{}}
      />
    ))
    .add('content changes', () => (
      <ChangeList
        ui={{
          stateDetail: {
            content: true
          }
        }}
        projectData={{}}
        changesData={{
          changes: [{}]
        }}
        changesGroupedData={[
          {...groups[0], changes: []},
          {...groups[1], changes: []},
          {...groups[2], changes: []},
          groups[3]
        ]}
        changes={{status: ''}}
        stateData={{}}
      />
    ))
    .add('all open', () => (
      <ChangeList
        ui={{
          stateDetail: {
            dom: true,
            layout: true,
            css: true,
            content: true
          }
        }}
        projectData={{}}
        changesData={{
          changes: [{}]
        }}
        changesGroupedData={groups}
        changes={{status: ''}}
        stateData={{}}
      />
    ))
    .add('all closed', () => (
      <ChangeList
        ui={{
          stateDetail: {
            dom: false,
            layout: false,
            css: false,
            content: false
          }
        }}
        projectData={{}}
        changesData={{
          changes: [{}]
        }}
        changesGroupedData={groups}
        changes={{status: ''}}
        stateData={{}}
      />
    ));

storiesOf('ChangeList/Shots', module)
    .add('no changes', () => (
      <ChangeList
        ui={{
          stateDetail: {
            dom: true,
            layout: true,
            css: true,
            content: true
          }
        }}
        projectData={{}}
        changesData={{
          changes: []
        }}
        changesGroupedData={groups}
        changes={{status: ''}}
        stateData={{
          isShot: true
        }}
      />
    ))
    .add('has changes', () => (
      <ChangeList
        ui={{
          stateDetail: {
            dom: false,
            layout: false,
            css: false,
            content: false
          }
        }}
        projectData={{}}
        changesData={{
          changes: [{}]
        }}
        changesGroupedData={groups}
        changes={{status: ''}}
        stateData={{
          isShot: true,
          diffUrl: 'url'
        }}
      />
    ));
