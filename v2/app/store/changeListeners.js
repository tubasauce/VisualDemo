import watch from 'redux-watch';
import * as routeActions from '../reducers/route/route-actions';

const configureChangeListeners = (store) => {
  // watch for route changes
  const watchLocationParams = watch(store.getState, 'ui.locationParams');
  store.subscribe(watchLocationParams((params, oldParams) => {
    const state = store.getState();
    if (state && state.ui && state.ui.location && state.ui.location.pathname) {
      store.dispatch(routeActions.manager(params, oldParams));
    }
  }));
};

export default configureChangeListeners;
