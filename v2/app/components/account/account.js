import React, {PropTypes} from 'react';
import AppContainer from '../app-container/app-container';
import LinkList from '../link-list/link-list';
import LinkItem from '../link-item/link-item';
import LinkHeading from '../link-heading/link-heading';
import Usage from '../usage/usage';
import UserProfile from '../user-profile/user-profile';
import ApiKey from '../api-key/api-key';
import ChangePassword from '../change-password/change-password';
import Notifications from '../notifications/notifications';
import Github from '../github/github';
import GithubEnterprise from '../github-enterprise/github-enterprise';
import VSTS from '../vsts/vsts';
import Webhooks from '../webhooks/webhooks';

const Account = (p) => {
  const AccountComponent = {
    'usage': Usage,
    'profile':  UserProfile,
    'api-key': ApiKey,
    'password': ChangePassword,
    'notifications': Notifications,
    'github': Github,
    'github-enterprise': GithubEnterprise,
    'vsts': VSTS,
    'webhooks': Webhooks
  }[p.params.view];
  const isOwner = window.appGlobal && window.appGlobal.user.isOwner;
  return (
    <AppContainer {...p} appView={p.params.view}>
      <div className="col-xs-3">
        <LinkList {...p}>
          <LinkHeading>Account Settings</LinkHeading>
          <LinkItem to="/v2/account/usage" indent>Usage Stats</LinkItem>
          <LinkItem to="/v2/account/profile" indent>User Profile</LinkItem>
          <LinkItem to="/v2/account/api-key" indent>API Key</LinkItem>
          <LinkItem to="/v2/account/password" indent>Change Password</LinkItem>
          <LinkItem to="/v2/account/notifications" indent>Notifications</LinkItem>
          <LinkHeading>Integrations</LinkHeading>
          {isOwner &&
            <LinkItem to="/v2/account/github" indent>GitHub</LinkItem>
          }
          {isOwner &&
            <LinkItem to="/v2/account/vsts" indent>Visual Studio Team Services</LinkItem>
          }
          <LinkItem to="/v2/account/webhooks" indent>Webhooks</LinkItem>
        </LinkList>
      </div>
      <div className="col-xs-9">
        <AccountComponent {...p} />
      </div>
    </AppContainer>
  );
};

ApiKey.propTypes = {
  params: PropTypes.object,
  user: PropTypes.object
};

export default Account;
