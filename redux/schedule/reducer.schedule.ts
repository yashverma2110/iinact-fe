import scheduleActionTypes from "./action-types.schedule";

const initialState = {
  loading: false,
  schedules: [],
};

const scheduleReducer = (
  state = initialState,
  { type, payload }: { type: string; payload: any }
) => {
  switch (type) {
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
