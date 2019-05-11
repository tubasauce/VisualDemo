import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const AppHeader = (p) => {
  const {user} = p;
  const isOwner = user && user.isOwner;
  return (
    <header id="header">
      <div className="container desktop-only">
        <div className="col-xs-12 justify-spaced">
          {user
            ? <a href="/v2/dashboard" className="logo"></a>
            : <a className="logo"></a>
          }
          <ul className="nav nav-pills">
            <li className={p.appView === 'dashboard' && 'active'}>
              {user
                ? <a href="/v2/dashboard">Dashboard</a>
                : <a>Dashboard</a>
              }
            </li>
            {user &&
              <li className={p.appView === 'teams' && 'active'}>
                <a href="/v2/teams">Teams</a>
              </li>
            }
            <li>
              <a href="/v2/docs">Documentation</a>
            </li>
            {!user &&
              <li>
                <a href="/login" className="border">Login</a>
              </li>
            }
            {user &&
              <li className="menu">
                <a>Account</a>
                <ul className="dropdown-menu pull-right">
                  <li className="dropdown-header">{user.email}</li>
                  <li className="divider"></li>
                  <li className={p.appView === 'usage' && 'active'}>
                    <Link to="/v2/account/usage">Usage Stats</Link>
                  </li>
                  <li className={p.appView === 'profile' && 'active'}>
                    <Link to="/v2/account/profile">User Profile</Link>
                  </li>
                  <li className={p.appView === 'api-key' && 'active'}>
                    <Link to="/v2/account/api-key">API Key</Link>
                  </li>
                  <li className={p.appView === 'password' && 'active'}>
                    <Link to="/v2/account/password">Change Password</Link>
                  </li>
                  <li className={p.appView === 'notifications' && 'active'}>
                    <Link to="/v2/account/notifications">Notifications</Link>
                  </li>
                  <li>
                    <a href="/v2/billing">Billing</a>
                  </li>
                  <li>
                    <a href="/v2/plans">Plans</a>
                  </li>
                  <li className="divider"></li>
                  <li className="dropdown-header">Integrations</li>
                  {isOwner &&
                    <li className={p.appView === 'github' && 'active'}>
                      <Link to="/v2/account/github">GitHub</Link>
                    </li>
                  }
                  {isOwner &&
                    <li className={p.appView === 'vsts' && 'active'}>
                      <Link to="/v2/account/vsts">Visual Studio Team Services</Link>
                    </li>
                  }
                  <li className={p.appView === 'webhooks' && 'active'}>
                    <Link to="/v2/account/webhooks">Webhooks</Link>
                  </li>
                  <li className="divider"></li>
                  <li className="dropdown-header">Products</li>
                  <li>
                    <a href="/v2" target="_self">
                      <span className="badge">Screener Components</span>
                    </a>
                  </li>
                  <li>
                    <a href="/app/dashboard" target="_self">Switch to Screener E2E</a>
                  </li>
                  <li className="divider"></li>
                  <li>
                    <a href="/logout" target="_self">Logout</a>
                  </li>
                </ul>
              </li>
            }
          </ul>
        </div>
      </div>
    </header>
  );
};

AppHeader.propTypes = {
  appView: PropTypes.string,
  user: PropTypes.object
};

export default AppHeader;
