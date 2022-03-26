import { AUTH_API_SERVICE } from "../../config/api.service";
import scheduleActionTypes from "./action-types.schedule";

interface createSchedulePayload {
  list: string;
  remindAt: string;
  days: string[];
}
export const createSchedule = (payload: createSchedulePayload) => {
  return {
    type: scheduleActionTypes.CREATE_SCHEDULE,
    payload: AUTH_API_SERVICE.post("schedule/create", payload),
  };
};
