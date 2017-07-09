// @flow weak
import type { Action, State } from './types';
import app from './app/reducer';
import isReactNative from './app/isReactNative';

// import { tabBarReducer as tabBar } from '../native/app/router';

import auth from './auth/reducer';
import config from './config/reducer';
import device from './device/reducer';
import intl from './intl/reducer';
import todos from './todos/reducer';
import users from './users/reducer';
import { combineReducers } from 'redux';
import { fieldsReducer as fields } from './lib/redux-fields';

// stackoverflow.com/q/35622588/233902
const resetStateOnSignOutReducer = (reducer, initialState) => (state: State, action: Action) => {
  const userWasSignedOut =
    action.type === 'ON_AUTH' && state.users.viewer && !action.payload.firebaseUser;
  if (!userWasSignedOut) {
    return reducer(state, action);
  }
  // Purge sensitive data, preserve only app and safe initial state.
  return reducer(
    {
      app: state.app,
      config: initialState.config,
      device: initialState.device,
      intl: initialState.intl,
    },
    action,
  );
};

const configureReducer = (initialState: Object) => {
  let reducers;
  if (isReactNative) {
    reducers = {
      app,
      auth,
      config,
      device,
      fields,
      intl,
      todos,
      users,
      // tabBar,
    };
  } else {
    reducers = {
      app,
      auth,
      config,
      device,
      fields,
      intl,
      todos,
      users,
    };
  }

  let reducer = combineReducers(reducers);
  // The power of higher-order reducers, http://slides.com/omnidan/hor
  reducer = resetStateOnSignOutReducer(reducer, initialState);

  return reducer;
};

export default configureReducer;
