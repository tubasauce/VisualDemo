import React, {PropTypes} from 'react';
import List from '../list/list';
import ListItem from '../list-item/list-item';
import LoaderItem from '../loader-item/loader-item';
import Button from '../button/button';
import Breadcrumb from '../breadcrumb/breadcrumb';
import Media from '../media/media';
import Confirm from 'react-confirm-bootstrap';
import ModalAddWebhook from '../modal-add-webhook/modal-add-webhook';

const Webhooks = (p) => {
  const {ui, accounts, accountsData, integration, integrationData} = p;
  const isLoadedAccounts = accounts.status === '';
  const isAdmin = isLoadedAccounts && accountsData.length > 0;
  const isLoaded = integration.status === '';
  const webhooks = integrationData.webhooks || [];
  const projects = integrationData.projects || [];
  const getProjectRepo = (id) => projects.filter(p => p._id === id)[0].repo;
  return (
    <List>
      <ListItem isActive>
        <Breadcrumb values={['Integration', 'Webhooks']} priority={4} />
      </ListItem>
      <LoaderItem request={accounts} />
      {isLoadedAccounts && !isAdmin &&
        <List>
          <ListItem>
            <h3 className="gray-out text-center space-bottom-4">You do not have permission to manage Webhooks</h3>
            <div className="alert alert-info space-bottom-2">
              Please contact an Admin on your Account to perform this action.
            </div>
          </ListItem>
        </List>
      }
      {isAdmin &&
        <LoaderItem request={integration} />
      }
      {isAdmin && isLoaded &&
        <List className="sub-list-bottom">
          <ListItem isActive>
            <div className="text-center">
              <h4>Endpoints</h4>
              <Button type="primary" onClick={() => p.updateUI('modal', 'addWebhook', true)} className="space-top-2">
                Add Webhook Endpoint
              </Button>
              <p className="space-top-4">
                You are subscribed to receive webhook events on the following endpoints:
              </p>
            </div>
            <br/>
            <table className="table">
              <tbody>
                {webhooks.length === 0 &&
                  <tr>
                    <td className="text-center">
                      <h5 className="gray-out">No Endpoints Found</h5>
                    </td>
                  </tr>
                }
                {webhooks.map(webhook => (
                  <tr className="active" key={webhook._id}>
                    <td>
                      <Media object={
                        <Confirm
                          onConfirm={() => p.removeWebhook(webhook._id)}
                          body="Are you sure you want to Delete this Webhook? This cannot be undone."
                          confirmText="Yes"
                          title={<div className="truncate">{`Delete Webhook: ${webhook.url}`}</div>}>
                          <Button border size="sm">Delete</Button>
                        </Confirm>
                        } side="right">
                        <span className="label label-default space-right-2">
                          {webhook.project ? getProjectRepo(webhook.project) : 'All Projects'}
                        </span>
                        <h5 className="large truncate">
                          {webhook.url}
                        </h5>
                      </Media>
                      <div className="small">
                        <span className="strong">Events:</span>&nbsp;
                        {webhook.events.join(', ')}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ListItem>
        </List>
      }
      <ModalAddWebhook {...p} isOpen={ui.modal.addWebhook} onClose={p.closeModal} />
    </List>
  );
};

Webhooks.propTypes = {
  ui: PropTypes.object,
  closeModal: PropTypes.func,
  accounts: PropTypes.object,
  accountsData: PropTypes.array,
  integration: PropTypes.object,
  integrationData: PropTypes.object,
  removeWebhook: PropTypes.func,
  updateUI: PropTypes.func
};

export default Webhooks;
