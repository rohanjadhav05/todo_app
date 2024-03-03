import { selector } from "recoil";
import { loggedState } from "../atoms/logged";

export const isLoggedSelector = selector({
    key: 'isLoggedSelector',
    get: ({ get }) => {
      const loggedStateValue = get(loggedState);
      return loggedStateValue.isLogged;
    },
});