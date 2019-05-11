import React, {PropTypes} from 'react';
import AppHeader from '../app-header/app-header';
import AppFooter from '../app-footer/app-footer';
import Notifications from 'react-notify-toast';

const AppContainer = (p) => {
  return (
    <div>
      <Notifications />
      <AppHeader {...p} />
      <div className="container desktop-only space-top-4">
        {p.children}
      </div>
      <AppFooter {...p} />
    </div>
  );
};

AppContainer.propTypes = {
  children: PropTypes.any
};

export default AppContainer;
