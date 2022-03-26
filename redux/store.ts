import { applyMiddleware, combineReducers, createStore } from "redux";
import logger from "redux-logger";
import promise from "redux-promise-middleware";
import { createWrapper } from "next-redux-wrapper";

// reducers
import authReducer from "./auth/reducer.auth";
import listReducer from "./lists/reducer.lists";
import scheduleReducer from "./schedule/reducer.schedule";

const reducer = combineReducers({
  auth: authReducer,
  lists: listReducer,
  schedules: scheduleReducer,
});

const store = () => createStore(reducer, applyMiddleware(promise, logger));

const reduxWrapper = createWrapper(store);

export default reduxWrapper;
