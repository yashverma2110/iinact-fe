import actionTypes from '../actionTypes';

const authReducer = (
  state = {
    firstName: '',
    lastName: '',
    email: '',
    tags: [],
    token: null,
  },
  action: {
    type: string;
    payload: any;
  }
) => {
  switch (action.type) {
    case actionTypes.AUTH.LOGIN:
      return {
        ...state,
        ...action.payload,
      };
    case actionTypes.AUTH.SIGNUP:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return { ...state };
  }
};

export default authReducer;
