import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
  Timestamp,
} from "firebase/firestore";
import { dbService } from "../lib/FStore";
import getTimeDepth from "./GetTimeDepth";

export const getSearchQuery = (
  isOrderByLikes = false,
  orderDescOrAsc = "desc",
  searchTimeDepth = getTimeDepth(),
  startAfterPoint = null,
  limitDocs = 0
) => {
  if (limitDocs > 0) {
    if (startAfterPoint) {
      if (isOrderByLikes) {
        // 추후에 "공감하기" 구현되면 사용될 예정
      } else {
        return query(
          collection(dbService, "WorryPost"),
          orderBy("created_timestamp", orderDescOrAsc),
          where("created_timestamp", ">=", searchTimeDepth),
          startAfter(startAfterPoint),
          limit(limitDocs)
        );
      }
    } else {
      if (isOrderByLikes) {
        // 추후에 "공감하기" 구현되면 사용될 예정
      } else {
        return query(
          collection(dbService, "WorryPost"),
          orderBy("created_timestamp", orderDescOrAsc),
          where("created_timestamp", ">=", searchTimeDepth),
          limit(limitDocs)
        );
      }
    }
  } else {
    if (startAfterPoint) {
      if (isOrderByLikes) {
        // 추후에 "공감하기" 구현되면 사용될 예정
      } else {
        return query(
          collection(dbService, "WorryPost"),
          orderBy("created_timestamp", orderDescOrAsc),
          where("created_timestamp", ">=", searchTimeDepth),
          startAfter(startAfterPoint)
        );
      }
    } else {
      if (isOrderByLikes) {
        // 추후에 "공감하기" 구현되면 사용될 예정
      } else {
        return query(
          collection(dbService, "WorryPost"),
          orderBy("created_timestamp", orderDescOrAsc),
          where("created_timestamp", ">=", searchTimeDepth)
        );
      }
    }
  }
};

export const invertTimeDepthToNum = (timeDepthValue) => {
  switch (timeDepthValue) {
    case "week":
      return 1;
    case "month":
      return 2;
    case "halfYear":
      return 3;
    case "fullYear":
      return 4;
    case "allTime":
      return 5;
    default:
      return 0;
  }
};

export const invertNumtoTimeDepth = (num) => {
  if (num === 1) {
    return "week";
  } else if (num === 2) {
    return "month";
  } else if (num === 3) {
    return "halfYear";
  } else if (num === 4) {
    return "fullYear";
  } else if (num === 5) {
    return "allTime";
  } else {
    return null;
  }
};

export const getTimeDepthObj = (str) => {
  switch (str) {
    case "week":
      return {
        week: true,
        month: false,
        halfYear: false,
        fullYear: false,
        allTime: false,
      };
    case "month":
      return {
        week: false,
        month: true,
        halfYear: false,
        fullYear: false,
        allTime: false,
      };
    case "halfYear":
      return {
        week: false,
        month: false,
        halfYear: true,
        fullYear: false,
        allTime: false,
      };
    case "fullYear":
      return {
        week: false,
        month: false,
        halfYear: false,
        fullYear: true,
        allTime: false,
      };
    case "allTime":
      return {
        week: false,
        month: false,
        halfYear: false,
        fullYear: false,
        allTime: true,
      };
    default:
      return null;
  }
};
