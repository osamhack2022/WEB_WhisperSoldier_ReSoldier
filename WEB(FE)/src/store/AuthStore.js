import { atom } from "recoil";

export const UserInfo = atom({
  key: "textState",
  default: {
    emailChecked: false,
    isLogin: false,
    refresh: false,
  },
});
