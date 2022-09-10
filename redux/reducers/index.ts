import { combineReducers } from 'redux';

// * reducers
import authReducer from './auth.reducer';
import listReducer from './list.reducer';
import scheduleReducer from './schedule.reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  schedule: scheduleReducer,
  list: listReducer,
});

export default rootReducer;
