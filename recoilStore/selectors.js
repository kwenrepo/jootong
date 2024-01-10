import { selector } from "recoil";
import { user } from "./atoms";

export const userSelector = selector({
  key:"userSelector",
  get: ({get}) => get(user),
  set: ({set}, session) => {
    set(user, session);
  }
})
