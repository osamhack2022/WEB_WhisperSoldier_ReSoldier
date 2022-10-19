import { dbFunction, dbService } from "../lib/FStore";
  
const {collection,
    limit,
    orderBy,
    query,
    startAfter,
    where,} = dbFunction;

  export const GetTagQuery = (
    collectionFrom = "",
    orderByField = "",
    whereFieldName = "",
    whereOperator = "",
    whereValue = null,
		limitDocs = 0,
		startAfterPoint = null,
  ) => {
    if (startAfterPoint) {
      return query(
        collection(dbService, collectionFrom),
        orderBy(orderByField, "desc"),
        where(whereFieldName, whereOperator, whereValue),
        startAfter(startAfterPoint),
        limit(limitDocs),
      );
    } else {
      return query(
        collection(dbService, collectionFrom),
        orderBy(orderByField, "desc"),
        where(whereFieldName, whereOperator, whereValue),
        limit(limitDocs),
      );
    }
  };
  