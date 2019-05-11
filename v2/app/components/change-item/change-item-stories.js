import React from 'react';
import { storiesOf } from '@storybook/react';
import ChangeItem from './change-item';

const projectData = {
  role: 'tester'
};

storiesOf('ChangeItem', module)
    .add('dom change', () => (
      <div>
        <ChangeItem type="dom"
          projectData={projectData}
          change={{
            tagName: 'div',
            dom: 'insert'
          }}
        />
        <ChangeItem type="dom"
          projectData={projectData}
          change={{
            tagName: 'div',
            dom: 'delete'
          }}
        />
        <ChangeItem type="dom"
          projectData={projectData}
          change={{
            tagName: 'div',
            dom: 'attributes'
          }}
        />
        <ChangeItem type="dom"
          projectData={projectData}
          change={{
            tagName: 'input',
            dom: [{name: 'type'}]
          }}
        />
      </div>
    ))
    .add('layout change', () => (
      <div>
        <ChangeItem type="layout"
          projectData={projectData}
          change={{
            tagName: 'div',
            layout: {
              top: 100
            }
          }}
        />
        <ChangeItem type="layout"
          projectData={projectData}
          change={{
            tagName: 'div',
            layout: {
              left: 100
            }
          }}
        />
        <ChangeItem type="layout"
          projectData={projectData}
          change={{
            tagName: 'div',
            layout: {
              width: 100
            }
          }}
        />
        <ChangeItem type="layout"
          projectData={projectData}
          change={{
            tagName: 'div',
            layout: {
              top: 100,
              left: 100,
              width: 100,
              height: 100
            }
          }}
        />
      </div>
    ))
    .add('css change', () => (
      <div>
        <ChangeItem type="css"
          projectData={projectData}
          change={{
            tagName: 'div',
            css: [{name: 'font-family'}, {name: 'font-size'}]
          }}
        />
      </div>
    ))
    .add('content change', () => (
      <div>
        <ChangeItem type="content"
          projectData={projectData}
          change={{
            tagName: 'svg',
            media: true,
            diffKey: true
          }}
        />
        <ChangeItem type="content"
          projectData={projectData}
          change={{
            tagName: 'img',
            media: [{name: 'src'}]
          }}
        />
        <ChangeItem type="content"
          projectData={projectData}
          change={{
            tagName: 'img',
            text: [{value: 'hello', type: 'insert'}, {value: 'bonjour', type: 'delete'}, {value: 'world', type: 'equal'}]
          }}
        />
      </div>
    ))
    .add('is ignored', () => (
      <div>
        <ChangeItem type="dom" isIgnored
          projectData={projectData}
          change={{
            tagName: 'div',
            dom: 'insert'
          }}
        />
        <ChangeItem type="layout" isIgnored
          projectData={projectData}
          change={{
            tagName: 'div',
            layout: {
              top: 100,
              left: 100,
              width: 100
            }
          }}
        />
        <ChangeItem type="css" isIgnored
          projectData={projectData}
          change={{
            tagName: 'div',
            css: [{name: 'font-family'}, {name: 'font-size'}]
          }}
        />
        <ChangeItem type="content" isIgnored
          projectData={projectData}
          change={{
            tagName: 'img',
            text: [{value: 'hello', type: 'insert'}, {value: 'bonjour', type: 'delete'}, {value: 'world', type: 'equal'}]
          }}
        />
      </div>
    ))
    .add('is viewer', () => (
      <div>
        <ChangeItem type="dom"
          projectData={{role: 'viewer'}}
          change={{
            tagName: 'div',
            dom: 'insert'
          }}
        />
        <ChangeItem type="layout"
          projectData={{role: 'viewer'}}
          change={{
            tagName: 'div',
            layout: {
              top: 100,
              left: 100,
              width: 100
            }
          }}
        />
        <ChangeItem type="css"
          projectData={{role: 'viewer'}}
          change={{
            tagName: 'div',
            css: [{name: 'font-family'}, {name: 'font-size'}]
          }}
        />
        <ChangeItem type="content"
          projectData={{role: 'viewer'}}
          change={{
            tagName: 'img',
            text: [{value: 'hello', type: 'insert'}, {value: 'bonjour', type: 'delete'}, {value: 'world', type: 'equal'}]
          }}
        />
      </div>
    ))
