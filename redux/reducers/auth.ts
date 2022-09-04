import actionTypes from '../actionTypes';

const authReducer = (
  state = {
    firstName: 'guest',
    lastName: 'guest name',
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
        name: action.payload,
      };
    default:
      return { ...state };
  }
};

export default authReducer;
