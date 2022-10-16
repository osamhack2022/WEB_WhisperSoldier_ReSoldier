import { atom } from "recoil";

export const UserInfo = atom({
  key: "textState", // unique ID (with respect to other atoms/selectors)
  default: {
    emailChecked: false,
    isLogin: false,
    refresh: false,
  }, // default value (aka initial value)
});

// export const UserProfileImgStore = atom({
//   key: "userProfileImgStore",
//   default: {},
// });
