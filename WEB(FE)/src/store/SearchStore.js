import { atom } from "recoil";

export const SearchInfo = atom({
  key: "search", // unique ID (with respect to other atoms/selectors)
  default: {
    searchKeyword: "",
  }, // default value (aka initial value)
});
