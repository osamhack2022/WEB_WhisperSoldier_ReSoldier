import { dbFunction, dbService } from "../lib/FStore";

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
  searchTimeDepth = null
) => {
  if (searchTimeDepth) {
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
  } else {
    if (startAfterPoint) {
      return query(
        collection(dbService, collectionFrom),
        orderBy(orderByField, orderDescOrAsc),
        where(whereFieldName, whereOperator, whereValue),
        startAfter(startAfterPoint),
        limit(limitDocs)
      );
    } else {
      return query(
        collection(dbService, collectionFrom),
        orderBy(orderByField, orderDescOrAsc),
        where(whereFieldName, whereOperator, whereValue),
        limit(limitDocs)
      );
    }
  }
};
