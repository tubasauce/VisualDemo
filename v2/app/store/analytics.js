import watch from 'redux-watch';
import scriptjs from 'scriptjs';

const configureAnalytics = (store) => {
  const user = window.appGlobal && window.appGlobal.user;

  // load Intercom
  scriptjs(`https://widget.intercom.io/widget/${process.env.INTERCOM_APP_ID}`, () => {
    const settings = {
      app_id: process.env.INTERCOM_APP_ID
    };
    if (user) {
      settings.email = user.email;
      settings.user_id = user._id;
      settings.user_hash = user.hash;
      settings.v2 = true;
      settings.is_owner = user.isOwner;
    }
    window.Intercom('boot', settings);
  });

  // load Google Analytics
  scriptjs('https://www.google-analytics.com/analytics.js', () => {
    window.ga('create', process.env.GOOGLE_ANALYTICS_ID, 'auto');
    window.ga('set', 'anonymizeIp', true);
    window.ga('send', 'pageview');
  });

  const watchRoute = watch(store.getState, 'routing.location.pathname');
  store.subscribe(watchRoute(() => {
    // on route change, send page update to analytics
    if (window.Intercom) {
      window.Intercom('update');
    }
    if (window.ga) {
      window.ga('set', 'anonymizeIp', true);
      window.ga('send', 'pageview');
    }
  }));
};

export default configureAnalytics;
