import { get } from "lodash";
import listActionTypes from "./action-types.lists";

const initialState = {
  loading: false,
  error: null,
  createdList: null,
  usersLists: [],
};

const listReducer = (
  state = initialState,
  { type, payload }: { type: string; payload: any }
) => {
  switch (type) {
    case listActionTypes.CREATE_LIST + "_PENDING":
      return { ...state, loading: true };
    case listActionTypes.CREATE_LIST + "_REJECTED":
      return {
        ...state,
        loading: false,
        error: get(payload, "response.data.error.msg", "Some error occured"),
      };
    case listActionTypes.CREATE_LIST + "_FULFILLED":
      return {
        ...state,
        loading: false,
        createdList: payload.data.list,
        userslists: [payload.data.list, ...state.usersLists],
      };

    // get lists
    case listActionTypes.GET_LISTS_BY_USER + "_PENDING":
      return { ...state, loading: true };
    case listActionTypes.GET_LISTS_BY_USER + "_REJECTED":
      return {
        ...state,
        loading: false,
        error: get(payload, "response.data.error.msg", "Some error occured"),
      };
    case listActionTypes.GET_LISTS_BY_USER + "_FULFILLED":
      return {
        ...state,
        loading: false,
        usersLists: get(payload, "data.lists", []),
      };

    default:
      return state;
  }
};

export default listReducer;
