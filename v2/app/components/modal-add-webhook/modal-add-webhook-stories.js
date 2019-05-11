import React from 'react';
import {storiesOf} from '@storybook/react';
import ModalAddWebhook from './modal-add-webhook';

storiesOf('ModalAddWebhook', module)
    .add('default', () => (
      <ModalAddWebhook
        isOpen={true}
        integrationData={{}}
        ui={{modal:{}}} />
    ))
    .add('validations', () => (
      <ModalAddWebhook
        isOpen={true}
        integrationData={{}}
        ui={{
          modal:{
            isSubmitted: true,
            events: []
          }
        }} />
    ));
