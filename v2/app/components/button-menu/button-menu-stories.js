import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ButtonMenu from './button-menu';

storiesOf('ButtonMenu', module)
    .add('closed', () => (
      <ButtonMenu label="Options" isOpen={false} onToggleOpen={action('onToggleOpen')}>
        <li><a>Item 1</a></li>
        <li><a>Item 2</a></li>
      </ButtonMenu>
    ))
    .add('open', () => (
      <ButtonMenu label="Options" isOpen={true} onToggleOpen={action('onToggleOpen')}>
        <li><a>Item 1</a></li>
        <li><a>Item 2</a></li>
      </ButtonMenu>
    ))
    .add('align right', () => (
      <div className="justify-end">
        <ButtonMenu label="Options" align="right" isOpen={true} onToggleOpen={action('onToggleOpen')}>
          <li><a>Item 1</a></li>
          <li><a>Item 2</a></li>
        </ButtonMenu>
      </div>
    ))
    .add('closed icon', () => (
      <ButtonMenu icon="cog" isOpen={false} onToggleOpen={action('onToggleOpen')}>
        <li><a>Item 1</a></li>
        <li><a>Item 2</a></li>
      </ButtonMenu>
    ))
    .add('open icon', () => (
      <ButtonMenu icon="cog" isOpen={true} onToggleOpen={action('onToggleOpen')}>
        <li><a>Item 1</a></li>
        <li><a>Item 2</a></li>
      </ButtonMenu>
    ));
