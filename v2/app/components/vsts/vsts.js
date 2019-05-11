import React, {PropTypes} from 'react';
import List from '../list/list';
import ListItem from '../list-item/list-item';
import LoaderItem from '../loader-item/loader-item';
import Breadcrumb from '../breadcrumb/breadcrumb';
import Icon from '../icon/icon';
import Button from '../button/button';
import Confirm from 'react-confirm-bootstrap';

const VSTS = (p) => {
  const {integration, integrationData} = p;
  const isIntegrated = integration.status === '' && integrationData.user;
  const isNotIntegrated = integration.status === '' && !integrationData.user;
  return (
    <List>
      <ListItem isActive>
        <Breadcrumb values={['Integration', 'Visual Studio Team Services']} priority={4} />
      </ListItem>
      <LoaderItem request={integration} />
      {isNotIntegrated &&
        <List className="sub-list-bottom">
          <ListItem isActive>
            <p className="space-top-2">
              Integrate Screener into your VSTS PR workflow, and do both code review + visual review from one place.&nbsp;
              <a href="/v2/docs/vsts">Learn More</a>
            </p>
            <hr/>
            <br/>
            <div className="text-center">
              <h5>Authorize Screener to update your Pull Request statuses:</h5>
              <a className="btn btn-primary btn-lg" href="/v2/integrations/vsts/install" target="_self">Grant VSTS Access</a>
            </div>
            <br/>
            <br/>
            <div className="alert alert-info">
              <strong>Note:&nbsp;</strong>
              <span>Screener needs access to your PR Statuses only. Screener will not have access to your code.</span>
            </div>
          </ListItem>
        </List>
      }
      {isIntegrated &&
        <List className="sub-list-bottom">
          <ListItem isActive>
            <p className="space-top-2">
              Integrate Screener into your VSTS PR workflow, and do both code review + visual review from one place.&nbsp;
              <a href="/v2/docs/vsts">Learn More</a>
            </p>
            <hr/>
            <br/>
            <div className="text-center">
              <h4>
                <Icon type="success" label="Screener is integrated with the following VSTS account:" />
              </h4>
              <div className="btn btn-success btn-lg">{integrationData.user.displayName}</div>
            </div>
            <br/>
            <br/>
          </ListItem>
          <ListItem className="text-right">
            <Confirm
              onConfirm={() => p.removeIntegration('vsts')}
              body="Are you sure you want to remove your integration with VSTS?"
              confirmText="Yes"
              title="WARNING">
              <Button border className="btn-wide">
                Remove VSTS Integration
              </Button>
            </Confirm>
          </ListItem>
        </List>
      }
    </List>
  );
};

VSTS.propTypes = {
  integration: PropTypes.object,
  integrationData: PropTypes.object,
  removeIntegration: PropTypes.func
};

export default VSTS;
