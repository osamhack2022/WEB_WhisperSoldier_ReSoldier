import { atom } from "recoil";

const UserInfo = atom({
  key: "textState", // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
});
