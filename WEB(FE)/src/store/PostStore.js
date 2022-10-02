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
