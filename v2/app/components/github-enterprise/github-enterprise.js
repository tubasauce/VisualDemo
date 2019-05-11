import React, {PropTypes} from 'react';
import {required, url, validate} from '../../utils/validation';
import List from '../list/list';
import ListItem from '../list-item/list-item';
import LoaderItem from '../loader-item/loader-item';
import Breadcrumb from '../breadcrumb/breadcrumb';
import Icon from '../icon/icon';
import Button from '../button/button';
import FormInput from '../form-input/form-input';
import Confirm from 'react-confirm-bootstrap';

const validateHostUrl = (value) =>
  validate([required, url])(value);

const validateClient = (value) =>
  validate([required])(value);

const GithubEnterprise = (p) => {
  const {ui, integration, integrationData} = p;
  const isIntegrated = integration.status === '' && integrationData.user;
  const isNotIntegrated = integration.status === '' && !integrationData.user;
  const onSubmit = () => {
    p.setIntegration('isSubmitted', true);
    if (validateHostUrl(ui.integration.hostUrl) || validateClient(ui.integration.clientId || validateClient(ui.integration.secret))) return;
    const data = {
      hostUrl: ui.integration.hostUrl,
      clientId: ui.integration.clientId,
      secret: ui.integration.secret
    };
    p.addIntegration('github-enterprise', data);
  };
  return (
    <List>
      <ListItem isActive>
        <Breadcrumb values={['Integration', 'GitHub Enterprise']} priority={4} />
      </ListItem>
      <LoaderItem request={integration} />
      {isNotIntegrated &&
        <List className="sub-list-bottom">
          <ListItem isActive>
            <p className="space-top-2">
              Integrate Screener into your GitHub Enterprise PR workflow, and do both code review + visual review from one place.&nbsp;
              <a href="/v2/docs/github-enterprise">Learn More</a>
            </p>
            <hr/>
            <div>
              <strong>Note:&nbsp;</strong>
              <span>
                GitHub Enterprise version 2.12+ is required.
              </span>
            </div>
            <br/>
            <h4>Register GitHub Enterprise OAuth App</h4>
            <p>
              To associate your Github Enterprise account with Screener you must first register your application:
            </p>
            <ol>
              <li>Go to <span className="strong">https://GITHUB_SERVER/settings/applications/new</span>, where GITHUB_SERVER is the domain of your GitHub Enterprise installation.</li>
              <li>
                Fill in the new application form:
                <ul>
                  <li>Application name: <span className="strong">Screener</span></li>
                  <li>Homepage URL: <span className="strong">https://screener.io</span></li>
                  <li>Authorization callback URL: <span className="strong">https://screener.io/integrations/github-enterprise/oauth</span></li>
                </ul>
              </li>
              <li>Click Register application to save.</li>
              <li>Copy <span className="strong">Client ID</span> and <span className="strong">Client Secret</span></li>
            </ol>
            <br/>
            <h4>Connect Screener to GitHub Enterprise</h4>
            <div className="row space-top-2">
              <div className="col-xs-6">
                <FormInput
                  label="Enter GitHub Enterprise Host URL"
                  type="text"
                  placeholder="https://github-enterprise-server"
                  maxLength={100}
                  onChange={(value) => p.setIntegration('hostUrl', value)}
                  errorMessage={ui.integration.isSubmitted && validateHostUrl(ui.integration.hostUrl)} />
              </div>
            </div>
            <div className="row">
              <div className="col-xs-6">
                <FormInput
                  label="Enter Client ID"
                  type="text"
                  maxLength={100}
                  onChange={(value) => p.setIntegration('clientId', value)}
                  errorMessage={ui.integration.isSubmitted && validateClient(ui.integration.clientId)} />
              </div>
            </div>
            <div className="row">
              <div className="col-xs-6">
                <FormInput
                  label="Enter Client Secret"
                  type="text"
                  maxLength={100}
                  onChange={(value) => p.setIntegration('secret', value)}
                  errorMessage={ui.integration.isSubmitted && validateClient(ui.integration.secret)} />
              </div>
            </div>
          </ListItem>
          <ListItem className="justify-spaced align-center">
            <a href="javascript: window.Intercom('show')">Need Help?</a>
            <Button type="primary" className="btn-wide" onClick={onSubmit}>
              Save &amp; Continue to GitHub Enterprise
            </Button>
          </ListItem>
        </List>
      }
      {isIntegrated &&
        <List className="sub-list-bottom">
          <ListItem isActive>
            <p className="space-top-2">
              Integrate Screener into your GitHub Enterprise PR workflow, and do both code review + visual review from one place.&nbsp;
              <a href="/v2/docs/github-enterprise">Learn More</a>
            </p>
            <hr/>
            <br/>
            <div className="text-center">
              <h4>
                <Icon type="success" label="Screener is integrated with the following GitHub Enterprise account:" />
              </h4>
              <a className="btn btn-success btn-lg" href={integrationData.user.html_url} target="_blank">{integrationData.user.login}</a>
            </div>
            <br/>
            <br/>
            <div className="alert alert-info">
              <strong>Note:&nbsp;</strong>
              <span>
                For repositories in GitHub Organizations, you need to request the Organization Admin to grant your App access to its repositories:&nbsp;
                <a href={integrationData.appUrl} target="_blank">{integrationData.appUrl}</a>
              </span>
            </div>
          </ListItem>
          <ListItem className="justify-spaced align-center">
            <a href="javascript: window.Intercom('show')">Need Help?</a>
            <Confirm
              onConfirm={() => p.removeIntegration('github-enterprise')}
              body="Are you sure you want to remove your integration with GitHub Enterprise?"
              confirmText="Yes"
              title="WARNING">
              <Button border className="btn-wide">
                Remove GitHub Enterprise Integration
              </Button>
            </Confirm>
          </ListItem>
        </List>
      }
    </List>
  );
};

GithubEnterprise.propTypes = {
  integration: PropTypes.object,
  integrationData: PropTypes.object,
  setIntegration: PropTypes.func,
  addIntegration: PropTypes.func,
  removeIntegration: PropTypes.func
};

export default GithubEnterprise;
