import watch from 'redux-watch';
import scriptjs from 'scriptjs';
import debounce from 'lodash/debounce';
import * as activityActions from '../reducers/activity/activity-actions';
import * as projectActions from '../reducers/project/project-actions';
import * as buildsActions from '../reducers/builds/builds-actions';

const configureRealtimeListeners = (store) => {
  let client;
  let isConnected = false;
  let channels = [];

  const activityLoad = () => store.dispatch(activityActions.load());
  const debouncedActivityLoad = debounce(activityLoad, 1000, {maxWait: 1000});

  const projectLoad = () => store.dispatch(projectActions.load(true));
  const debouncedProjectLoad = debounce(projectLoad, 1000, {maxWait: 1000});

  const buildsLoad = () => store.dispatch(buildsActions.load(true));
  const debouncedBuildsLoad = debounce(buildsLoad, 1000, {maxWait: 1000});

  const subscriptionRules = (msg) => {
    const ui = store.getState().ui;
    /*
    on project creation
    channel: accountId
    msg:
    {
      type: 'project',
      project
    }
    */
    if (msg.type === 'project' && msg.project) {
      subscribe(msg.project);
      debouncedActivityLoad();
    }

    /*
    on build create AND on build updateStatus
    channel: projectId
    {
      type: 'build',
      project,
      environment
    }
    */
    if (msg.type === 'build') {
      debouncedActivityLoad();
      if (ui.selected.project === msg.project && ui.selected.branch === msg.environment) {
        debouncedProjectLoad();
        if (ui.dashboard.resultType === 'history') {
          debouncedBuildsLoad();
        }
      }
    }

    /*
    on state status update
    channel: projectId
    {
      type: 'state',
      project,
      environment
    }
    */
    if (msg.type === 'state' && ui.selected.project === msg.project && ui.selected.branch === msg.environment) {
      debouncedProjectLoad();
    }

    /*
    on history create / update / updateStatus
    channel: projectId
    {
      type: 'history',
      project,
      environment
    }
    Q: have all fields? create = YES. update = NO. updateStatus = NO
    */
    if (msg.type === 'history') {
      if (ui.selected.project === msg.project && ui.selected.branch === msg.environment) {
        debouncedProjectLoad();
        if (ui.dashboard.resultType === 'history') {
          debouncedBuildsLoad();
        }
      }
    }
  };

  const subscribe = (channel, noSkip) => {
    if (channels.indexOf(channel) === -1) {
      // store channel to subscribe to when connected
      channels.push(channel);
    } else if (!noSkip) {
      // skip if already subscribed to channel
      return;
    }
    if (isConnected) {
      if (process.env.NODE_ENV === 'development') {
        console.log('subscribe to channel ' + channel);
      }
      client.subscribe(channel, true, function (conn, channel, message) {
        var msgObj = JSON.parse(message);
        msgObj.channel = channel;
        if (process.env.NODE_ENV === 'development') {
          console.log(msgObj);
        }
        subscriptionRules(msgObj);
      });
    }
  };

  // load Realtime messaging library
  scriptjs('https://messaging-public.realtime.co/js/2.1.0/ortc.js', () => {
    // connect to Realtime
    window.loadOrtcFactory(window.IbtRealTimeSJType, (factory, err) => {
      if (err) return console.error(err);
      if (!factory) return console.error('realtimeListeners: No Factory Returned');
      client = factory.createClient();
      client.setClusterUrl('https://ortc-developers.realtime.co/server/ssl/2.1/');
      client.onConnected = function () {
        isConnected = true;
        // subscribe to any channels which were added before connecting
        channels.forEach((channel) => subscribe(channel, true));
      };
      client.onException = function (conn, exception) {
        console.error(exception);
      };
      client.connect(process.env.REALTIME_KEY, process.env.REALTIME_TOKEN);
    });
  });

  // watch for changes to selected project/branch
  const watchActivity = watch(store.getState, 'activity.result');
  store.subscribe(watchActivity((value) => {
    if (value.accounts) {
      value.accounts.forEach((account) => subscribe(account));
    }
    if (value.projects) {
      value.projects.forEach(({project}) => subscribe(project));
    }
  }));
};

export default configureRealtimeListeners;
