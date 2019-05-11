import React, {PropTypes} from 'react';
import {required, url, validate} from '../../utils/validation';
import Modal from '../modal/modal';
import Button from '../button/button';
import FormInput from '../form-input/form-input';
import FormSelect from '../form-select/form-select';
import FormCheckboxes from '../form-checkboxes/form-checkboxes';

const validateUrl = (value) =>
  validate([required, url])(value);

const validateEvents = (events) =>
  events.length === 0 && 'Must select at least one event';

const ModalAddWebhook = p => {
  const {ui, isOpen, integrationData} = p;
  const projects = (integrationData.projects || []).map(project => ({
    label: project.repo,
    value: project._id
  }));
  const eventTypes = [
    {label: 'build.status.error', value: 'build.status.error'},
    {label: 'build.status.failure', value: 'build.status.failure'},
    {label: 'build.status.success', value: 'build.status.success'}
  ];
  const events = ui.modal.events || ['build.status.error', 'build.status.failure', 'build.status.success'];
  const onSubmit = () => {
    p.updateUI('modal', 'isSubmitted', true);
    if (validateUrl(ui.modal.url) || validateEvents(events)) return;
    const result = {
      url: ui.modal.url,
      events
    };
    if (ui.modal.project && ui.modal.project !== 'all') {
      result.project = ui.modal.project;
    }
    p.addWebhook(result);
  };
  return (
    <Modal
      isOpen={!!isOpen}
      title="Add Webhook Endpoint"
      onClose={p.onClose}
    >
      <FormInput
        label="URL to be called"
        placeholder="https://domain.com/webhook"
        value={ui.modal.url || ''}
        onChange={(value) => p.updateUI('modal', 'url', value)}
        errorMessage={ui.modal.isSubmitted && validateUrl(ui.modal.url)} />

      <FormSelect
        label="Filter project"
        options={[{label: 'All Projects', value: 'all'}].concat(projects)}
        value={ui.modal.project || 'all'}
        onChange={(value) => p.updateUI('modal', 'project', value)} />

      <FormCheckboxes
        label="Filter events"
        options={eventTypes}
        values={events}
        onChange={(values) => p.updateUI('modal', 'events', values)}
        errorMessage={ui.modal.isSubmitted && validateEvents(events)} />

      <div className="text-right">
        <Button onClick={p.onClose} className="space-right">Cancel</Button>
        <Button type="primary" onClick={onSubmit}>Add Endpoint</Button>
      </div>
    </Modal>
  );
};

ModalAddWebhook.propTypes = {
  ui: PropTypes.object,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  updateUI: PropTypes.func,
  integrationData: PropTypes.object,
  addWebhook: PropTypes.func
};

export default ModalAddWebhook;
