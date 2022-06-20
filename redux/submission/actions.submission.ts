import { API_SERVICE } from "../../config/api.service";
import submissionActionTypes from "./action-types.submission";

interface createSubmittionPayload {
  link: string;
  list: string;
  score: number;
  reviewAgain: boolean;
  remark?: string;
  tag: string;
  user: string;
}
const createSubmission = (data: createSubmittionPayload) => {
  return {
    type: submissionActionTypes.CREATE_SUBMISSION,
    payload: API_SERVICE.post("submission/create", data),
  };
};

export { createSubmission };
