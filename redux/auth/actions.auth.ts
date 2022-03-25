import { API_SERVICE } from "../../config/api.service";
import authActionTypes from "./action-types.auth";

interface loginPayload {
  email: string;
  password: string;
}
const login = (data: loginPayload) => {
  return {
    type: authActionTypes.LOGIN,
    payload: API_SERVICE.post("user/login", data),
  };
};

interface signupPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
const signup = (data: signupPayload) => {
  return {
    type: authActionTypes.SIGNUP,
    payload: API_SERVICE.post("user/signup", data),
  };
};

interface getUserPayload {
  token: string;
}
const getUser = (data: getUserPayload) => {
  return {
    type: authActionTypes.GET_USER,
    payload: API_SERVICE.get("user/details", {
      headers: {
        Authorization: "Bearer " + data.token,
      },
    }),
  };
};

export { login, signup, getUser };
