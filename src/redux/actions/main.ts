import { validLogin } from "./../../components/AuthForm";
import { actionName, userReudcers, Quiz } from "../types/Main";

export const changeIsAuth = (val: validLogin): userReudcers => ({
  type: actionName.CHECK_IS_AUTH,
  payload: val,
});

export const addNewQuest = (val: Quiz) => ({
  type: actionName.ADD_NEW_QUEST,
  payload: val,
});
