import actionTypes from '../actionTypes';

const scheduleActions = {
  getAll(payload: any) {
    return {
      type: actionTypes.SCHEDULE.ALL,
      payload,
    };
  },
};

export default scheduleActions;
