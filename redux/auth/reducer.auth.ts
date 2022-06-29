import authActionTypes from "./action-types.auth";
import { get } from "lodash";

interface authInitialState {
  loading: boolean;
  user: any;
  loginError: null | string;
  signupError: null | string;
  getUserError: null | string;
  addTagError: null | string;
}
const initialState = {
  loading: false,
  loginError: null,
  signupError: null,
  user: {},
  getUserError: null,
  addTagError: null,
};

const authReducer = (state: authInitialState = initialState, action: any) => {
  switch (action.type) {
    case authActionTypes.LOGIN + "_PENDING":
      return {
        ...state,
        loading: true,
      };
    case authActionTypes.LOGIN + "_FULFILLED":
      return {
        ...state,
        loading: false,
        user: action.payload.data,
        loginError: null,
      };
    case authActionTypes.LOGIN + "_REJECTED":
      return {
        ...state,
        loading: false,
        loginError: get(
          action,
          "payload.response.data.error.msg",
          "Some error occured"
        ),
      };
    case authActionTypes.SIGNUP + "_PENDING":
      return {
        ...state,
        loading: true,
      };
    case authActionTypes.SIGNUP + "_FULFILLED":
      return {
        ...state,
        loading: false,
        user: action.payload.data,
        signupError: null,
      };
    case authActionTypes.SIGNUP + "_REJECTED":
      return {
        ...state,
        loading: false,
        signupError: get(
          action,
          "payload.response.data.error.msg",
          "Some error occured"
        ),
      };
    case authActionTypes.GET_USER + "_PENDING":
      return {
        ...state,
        loading: true,
      };
    case authActionTypes.GET_USER + "_FULFILLED":
      return {
        ...state,
        loading: false,
        user: action.payload.data,
      };
    case authActionTypes.GET_USER + "_REJECTED":
      return {
        ...state,
        loading: false,
        getUserError: action.payload,
      };
    case authActionTypes.ADD_TAG_FOR_USER + "_PENDING":
      return {
        ...state,
        loading: true,
      };
    case authActionTypes.ADD_TAG_FOR_USER + "_FULFILLED":
      return {
        ...state,
        loading: false,
        user: {
          ...(state.user ?? {}),
          tags: [...(state.user?.tags ?? []), action.payload.tag],
        },
      };
    case authActionTypes.ADD_TAG_FOR_USER + "_REJECTED":
      return {
        ...state,
        loading: false,
        addTagError: get(
          action,
          "payload.response.data.error.msg",
          "Some error occured"
        ),
      };
    default:
      return { ...state };
  }
};

export default authReducer;
