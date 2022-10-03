import { atom } from "recoil";

export const PostInfo = atom({
  key: "postInfo", // unique ID (with respect to other atoms/selectors)
  default: {
    creator_id: "",
    created_timestamp: null,
    id: "",
    postContent: "",
  }, // default value (aka initial value)
});

export const PostsList = atom({
  key: "postsList",
  default: [],
});

export const CountPost = atom({
  key: "countPost",
  default: 10,
});

export const IsLastPost = atom({
  key: "isLastPost",
  default: false,
});

export const CurrentScrollPos = atom({
  key: "currentScrollPos",
  default: 0,
});
