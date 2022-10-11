import {
  collection,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { whisperSodlierSessionKey } from "../lib/Const";
import { dbService } from "../lib/FStore";

export const getProfilePageQuery = (
  collectionFrom = "",
  userIdFieldName = "",
  limitDocs = 0,
  startAfterPoint = null
) => {
  const { uid: currentUserUid } = JSON.parse(
    sessionStorage.getItem(whisperSodlierSessionKey)
  );
  if (startAfterPoint) {
    return query(
      collection(dbService, collectionFrom),
      orderBy("created_timestamp", "desc"),
      where(userIdFieldName, "==", currentUserUid),
      startAfter(startAfterPoint),
      limit(limitDocs)
    );
  } else {
    return query(
      collection(dbService, collectionFrom),
      orderBy("created_timestamp", "desc"),
      where(userIdFieldName, "==", currentUserUid),
      limit(limitDocs)
    );
  }
};
