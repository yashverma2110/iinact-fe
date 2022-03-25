import { AUTH_API_SERVICE } from "../../config/api.service";
import listActionTypes from "./action-types.lists";

export const getListsByUser = () => {
  return {
    type: listActionTypes.GET_LISTS_BY_USER,
    payload: AUTH_API_SERVICE.get("list/me"),
  };
};

interface createListPayload {
  name: string;
  desc: string;
  type: string;
  urls: string[];
}
export const createList = (payload: createListPayload) => {
  return {
    type: listActionTypes.CREATE_LIST,
    payload: AUTH_API_SERVICE.post("list/create", payload),
  };
};

interface editListPayload {
  name?: string;
  desc?: string;
  type?: string;
  urls?: string[];
}
export const editList = (id: string, payload: editListPayload) => {
  return {
    type: listActionTypes.EDIT_LIST,
    payload: AUTH_API_SERVICE.patch(`list/edit/${id}`, payload),
  };
};

