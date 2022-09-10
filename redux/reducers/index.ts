import { combineReducers } from 'redux';

// * reducers
import authReducer from './auth.reducer';
import scheduleReducer from './schedule.reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  schedule: scheduleReducer,
});

export default rootReducer;
