import actionTypes from '../actionTypes';

const authActions = {
  signUp(payload: any) {
    return {
      type: actionTypes.AUTH.SIGNUP,
      payload,
    };
  },

  logIn(payload: any) {
    return {
      type: actionTypes.AUTH.LOGIN,
      payload,
    };
  },
};

export default authActions;
