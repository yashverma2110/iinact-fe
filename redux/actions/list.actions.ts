import actionTypes from '../actionTypes';

const listActions = {
  getAll(payload: any) {
    return {
      type: actionTypes.LIST.ALL,
      payload,
    };
  },

  create(payload: any) {
    return {
      type: actionTypes.LIST.CREATE,
      payload,
    };
  },
};

export default listActions;
