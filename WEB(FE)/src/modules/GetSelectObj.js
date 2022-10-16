export const getSelectObj = (prev, select) => {
  if (select === "profile") {
    return {
      ...prev,
      profile: true,
      myPost: false,
      myComment: false,
      likePost: false,
      likeComment: false,
    };
  } else if (select === "myPost") {
    return {
      ...prev,
      profile: false,
      myPost: true,
      myComment: false,
      likePost: false,
      likeComment: false,
    };
  } else if (select === "myComment") {
    return {
      ...prev,
      profile: false,
      myPost: false,
      myComment: true,
      likePost: false,
      likeComment: false,
    };
  } else if (select === "likePost") {
    return {
      ...prev,
      profile: false,
      myPost: false,
      myComment: false,
      likePost: true,
      likeComment: false,
    };
  } else if (select === "likeComment") {
    return {
      ...prev,
      profile: false,
      myPost: false,
      myComment: false,
      likePost: false,
      likeComment: true,
    };
  }
};
