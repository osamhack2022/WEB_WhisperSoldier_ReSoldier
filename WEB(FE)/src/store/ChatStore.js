import { atom } from "recoil";

export const StartFirstChat = atom({
  key: "startFirstChat",
  default: {
    exist: false,
    docUID: "",
  },
});
