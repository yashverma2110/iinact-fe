import actionTypes from '../actionTypes';

const listReducer = (
  state = {
    userOwned: [],
  },
  action: {
    type: string;
    payload: any;
  }
) => {
  switch (action.type) {
    case actionTypes.LIST.ALL:
      return {
        ...state,
        userOwned: action.payload,
      };
    case actionTypes.LIST.CREATE:
      return {
        ...state,
        userOwned: [action.payload, ...state.userOwned],
      };
    default:
      return { ...state };
  }
};

export default listReducer;
