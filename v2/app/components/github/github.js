import React, {PropTypes} from 'react';
import List from '../list/list';
import ListItem from '../list-item/list-item';
import LoaderItem from '../loader-item/loader-item';
import Breadcrumb from '../breadcrumb/breadcrumb';
import Icon from '../icon/icon';
import Button from '../button/button';
import Confirm from 'react-confirm-bootstrap';

const Github = (p) => {
  const {integration, integrationData} = p;
  const isIntegrated = integration.status === '' && integrationData.user;
  const isNotIntegrated = integration.status === '' && !integrationData.user;
  return (
    <List>
      <ListItem isActive>
        <Breadcrumb values={['Integration', 'GitHub']} priority={4} />
      </ListItem>
      <LoaderItem request={integration} />
      {isNotIntegrated &&
        <List className="sub-list-bottom">
          <ListItem isActive>
            <p className="space-top-2">
              Integrate Screener into your GitHub PR workflow, and do both code review + visual review from one place.&nbsp;
              <a href="/v2/docs/github">Learn More</a>
            </p>
            <hr/>
            <br/>
            <div className="text-center">
              <h5>Authorize Screener to update your GitHub commit statuses:</h5>
              <a className="btn btn-primary btn-lg" href="/v2/integrations/github/install" target="_self">Grant GitHub Access</a>
            </div>
            <br/>
            <br/>
            <div className="alert alert-info">
              <strong>Note:&nbsp;</strong>
              <span>Screener needs access to your Commit Statuses only. Screener will not have access to your code.</span>
            </div>
          </ListItem>
        </List>
      }
      {isIntegrated &&
        <List className="sub-list-bottom">
          <ListItem isActive>
            <p className="space-top-2">
              Integrate Screener into your GitHub PR workflow, and do both code review + visual review from one place.&nbsp;
              <a href="/v2/docs/github">Learn More</a>
            </p>
            <hr/>
            <br/>
            <div className="text-center">
              <h4>
                <Icon type="success" label="Screener is integrated with the following GitHub account:" />
              </h4>
              <a className="btn btn-success btn-lg" href={integrationData.user.html_url} target="_blank">{integrationData.user.login}</a>
            </div>
            <br/>
            <br/>
            <div className="alert alert-info">
              <strong>Note:&nbsp;</strong>
              <span>
                For repositories in GitHub Organizations, you need to request the Organization Admin to grant Screener access to its repositories:&nbsp;
                <a href="https://github.com/settings/applications" target="_blank">https://github.com/settings/applications</a>
              </span>
            </div>
          </ListItem>
          <ListItem className="text-right">
            <Confirm
              onConfirm={() => p.removeIntegration('github')}
              body="Are you sure you want to remove your integration with GitHub?"
              confirmText="Yes"
              title="WARNING">
              <Button border className="btn-wide">
                Remove GitHub Integration
              </Button>
            </Confirm>
          </ListItem>
        </List>
      }
    </List>
  );
};

Github.propTypes = {
  integration: PropTypes.object,
  integrationData: PropTypes.object,
  removeIntegration: PropTypes.func
};

export default Github;
