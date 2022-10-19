import { dbFunction, dbService } from "../lib/FStore";
import getTimeDepth from "./GetTimeDepth";

const { collection, limit, orderBy, query, startAfter, where } = dbFunction;

export const GetTagQuery = (
  collectionFrom = "",
  orderByField = "",
  orderDescOrAsc = "",
  whereFieldName = "",
  whereOperator = "",
  whereValue = null,
  limitDocs = 0,
  startAfterPoint = null,
  isSearchingTag = false,
  searchTimeDepth = "A",
//Tag를 가져올때는 "where(orderByField, ">=", searchTimeDepth)," 부분이 실행되지 않도록 해야 함.
) => {
  if (startAfterPoint) {
    return query(
      collection(dbService, collectionFrom),
      orderBy(orderByField, orderDescOrAsc),
      where(whereFieldName, whereOperator, whereValue),
      where(orderByField, ">=", searchTimeDepth),
      startAfter(startAfterPoint),
      limit(limitDocs)
    );
  } else {
    return query(
      collection(dbService, collectionFrom),
      orderBy(orderByField, orderDescOrAsc),
      where(whereFieldName, whereOperator, whereValue),
      where(orderByField, ">=", searchTimeDepth),
      limit(limitDocs)
    );
  }
};
