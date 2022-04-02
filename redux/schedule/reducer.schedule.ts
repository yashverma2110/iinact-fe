import scheduleActionTypes from "./action-types.schedule";

type scheduleState = {
  loading: boolean;
  schedules: Schedule[];
};
const initialState: scheduleState = {
  loading: false,
  schedules: [],
};

const scheduleReducer = (
  state = initialState,
  { type, payload }: { type: string; payload: any }
) => {
  switch (type) {
    case scheduleActionTypes.GET_USER_SCHEDULES + "_PENDING":
      return { ...state, loading: true };
    case scheduleActionTypes.GET_USER_SCHEDULES + "_REJECTED":
      return { ...state, loading: false };
    case scheduleActionTypes.GET_USER_SCHEDULES + "_FULFILLED":
      return {
        ...state,
        loading: false,
        schedules: payload.data.schedules,
      };

    case scheduleActionTypes.CREATE_SCHEDULE + "_PENDING":
      return { ...state, loading: true };
    case scheduleActionTypes.CREATE_SCHEDULE + "_REJECTED":
      return { ...state, loading: false };
    case scheduleActionTypes.CREATE_SCHEDULE + "_FULFILLED":
      return {
        ...state,
        loading: false,
        schedules: [payload.data.schedule, ...state.schedules],
      };

    default:
      return state;
  }
};

export default scheduleReducer;
