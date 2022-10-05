import { atom } from "recoil";

export const PostInfo = atom({
  key: "postInfo",
  default: {
    creator_id: "",
    created_timestamp: null,
    id: "",
    postContent: "",
  },
});

export const PostsRecoil = atom({
  key: "postsRecoil",
  default: [],
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

export const IsUpdatePostList = atom({
  key: "isUpdatePostList",
  default: false,
});
