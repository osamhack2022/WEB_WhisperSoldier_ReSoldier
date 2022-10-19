import { atom } from "recoil";

export const PostInfo = atom({
  key: "postInfo",
  default: {
    creator_id: "",
    created_timestamp: null,
    id: "",
    like_count: 0,
    comment_count: 0,
    postContent: "",
    tag_name: "",
  },
});

export const IsUpdatePostList = atom({
  key: "isUpdatePostList",
  default: {
    searchPage: false,
    newestPage: false,
    popularPage: false,
  },
});

export const PostsRecoil = atom({
  key: "postsRecoil",
  default: [],
});

export const PostListSortOption = atom({
  key: "postListSortOption",
  default: {
    timeSettingValue: "week",
    descSettingValue: true,
  },
});

export const CountCurrentPost = atom({
  key: "countCurrentPost",
  default: 10,
});

export const IsNextPostExistRecoil = atom({
  key: "isNextPostExistRecoil",
  default: false,
});

export const CurrentScrollPos = atom({
  key: "currentScrollPos",
  default: 0,
});
