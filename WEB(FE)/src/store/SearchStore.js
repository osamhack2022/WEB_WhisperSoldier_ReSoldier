import { atom } from "recoil";

export const SearchInfo = atom({
  key: "searchInfoStore",
  default: {
    searchKeyword: "",
    countResultPosts: 0,
    currentCountPosts: 0,
    isExistNextSearchResult: false,
    timeSettingValue: "week",
    descSettingValue: true,
  },
});

export const ResultList = atom({
  key: "resultListStore",
  default: [],
});
