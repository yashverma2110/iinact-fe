import authActionTypes from "./action-types.submission";
import { get } from "lodash";

const submissionReducer = (
  state = {
    loading: false,
    error: null,
    submissions: [],
  },
  action: any
) => {
  switch (action.type) {
    case authActionTypes.CREATE_SUBMISSION + "_PENDING":
      return {
        ...state,
        loading: true,
      };
    case authActionTypes.CREATE_SUBMISSION + "_FULFILLED":
      return {
        ...state,
        loading: false,
        error: null,
      };
    case authActionTypes.CREATE_SUBMISSION + "_REJECTED":
      return {
        ...state,
        loading: false,
        error: get(
          action,
          "payload.response.data.error.msg",
          "Some error occured"
        ),
      };
    default:
      return { ...state };
  }
};

export default submissionReducer;
