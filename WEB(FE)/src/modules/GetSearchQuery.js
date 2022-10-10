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
