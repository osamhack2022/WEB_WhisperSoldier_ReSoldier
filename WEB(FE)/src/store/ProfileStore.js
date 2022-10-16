import { atom } from "recoil";

export const ProfileSelectStore = atom({
  key: "profileSelectStore",
  default: {
    profile: true,
    myPost: false,
    myComment: false,
    likePost: false,
    likeComment: false,
  },
});

export const ShowContentStore = atom({
  key: "showContentStore",
  default: false,
});

export const UpdateProfileInfo = atom({
  key: "updateProfileInfo",
  default: false,
});
