import { atom } from "recoil";

export const ProcessInfoStore = atom({
  key: "ProcessInfoStore",
  default: {
    finishWritePost: false,
  },
});
