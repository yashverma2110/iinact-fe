import actionTypes from '../actionTypes';

const scheduleReducer = (
  state = {
    schedules: [],
  },
  action: {
    type: string;
    payload: any;
  }
) => {
  switch (action.type) {
    case actionTypes.SCHEDULE.ALL:
      return {
        ...state,
        schedules: action.payload,
      };
    default:
      return { ...state };
  }
};

export default scheduleReducer;
