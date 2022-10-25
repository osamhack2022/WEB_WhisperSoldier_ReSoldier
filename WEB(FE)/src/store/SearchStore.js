import { atom } from "recoil";

export const SearchInfo = atom({
  key: "searchInfo",
  default: {
    searchKeyword: "",
    countResultPosts: 0,
    currentCountPosts: 0,
    isExistNextSearchResult: false,
    //isUpdateResultList: false,
    timeSettingValue: "week",
    descSettingValue: true,
  },
});

export const ResultList = atom({
  key: "resultList",
  default: [],
});

export const ShowSearchContent = atom({
  key: "showSearchContent",
  default: false,
});
