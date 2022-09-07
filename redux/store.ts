import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { createWrapper } from 'next-redux-wrapper';
import rootReducer from './reducers';

const middleware = [logger];

const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware,
  });

export const wrapper = createWrapper(makeStore);
