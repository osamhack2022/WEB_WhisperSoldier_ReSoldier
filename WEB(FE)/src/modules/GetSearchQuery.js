import {
  collection,
  limit,
  orderBy,
  query,
  startAfter,
  where,
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
        return query(
          collection(dbService, "WorryPost"),
          orderBy("like_count", "desc"),
          orderBy("created_timestamp", orderDescOrAsc),
          startAfter(startAfterPoint),
          limit(limitDocs)
        );
      } else {
        return query(
          collection(dbService, "WorryPost"),
          where("created_timestamp", ">=", searchTimeDepth),
          orderBy("created_timestamp", orderDescOrAsc),
          limit(limitDocs),
          startAfter(startAfterPoint)
        );
      }
    } else {
      if (isOrderByLikes) {
        return query(
          collection(dbService, "WorryPost"),
          orderBy("like_count", "desc"),
          orderBy("created_timestamp", orderDescOrAsc),
          limit(limitDocs)
        );
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
      if (!isOrderByLikes) {
        return query(
          collection(dbService, "WorryPost"),
          orderBy("created_timestamp", orderDescOrAsc),
          where("created_timestamp", ">=", searchTimeDepth),
          startAfter(startAfterPoint)
        );
      }
    } else {
      if (!isOrderByLikes) {
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
