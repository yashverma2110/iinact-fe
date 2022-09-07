import { combineReducers } from 'redux';

// * reducers
import authReducer from './auth.reducer';

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
