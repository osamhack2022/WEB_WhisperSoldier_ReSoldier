import { atom } from "recoil";

export const TagInfoStore = atom({
  key: "tagInfo",
  default: {
    id: "",
    name: "",
    count: 0,
  },
});
