import { combineReducers } from 'redux';

// * reducers
import authReducer from './auth';

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
