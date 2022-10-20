export const getSelectObj = (prev, select) => {
  if (select === "profile") {
    return {
      ...prev,
      profile: true,
      myPost: false,
      myComment: false,
      likePost: false,
      likeComment: false,
      reportedPost: false,
      reportedComment: false,
    };
  } else if (select === "myPost") {
    return {
      ...prev,
      profile: false,
      myPost: true,
      myComment: false,
      likePost: false,
      likeComment: false,
      reportedPost: false,
      reportedComment: false,
    };
  } else if (select === "myComment") {
    return {
      ...prev,
      profile: false,
      myPost: false,
      myComment: true,
      likePost: false,
      likeComment: false,
      reportedPost: false,
      reportedComment: false,
    };
  } else if (select === "likePost") {
    return {
      ...prev,
      profile: false,
      myPost: false,
      myComment: false,
      likePost: true,
      likeComment: false,
      reportedPost: false,
      reportedComment: false,
    };
  } else if (select === "likeComment") {
    return {
      ...prev,
      profile: false,
      myPost: false,
      myComment: false,
      likePost: false,
      likeComment: true,
      reportedPost: false,
      reportedComment: false,
    };
  } else if (select === "reportedPost") {
    return {
      ...prev,
      profile: false,
      myPost: false,
      myComment: false,
      likePost: false,
      likeComment: false,
      reportedPost: true,
      reportedComment: false,
    };
  } else if (select === "reportedComment") {
    return {
      ...prev,
      profile: false,
      myPost: false,
      myComment: false,
      likePost: false,
      likeComment: false,
      reportedPost: false,
      reportedComment: true,
    };
  }
};
