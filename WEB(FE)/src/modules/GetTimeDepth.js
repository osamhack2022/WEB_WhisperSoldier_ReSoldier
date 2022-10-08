import { Timestamp } from "firebase/firestore";

const now = new Date();

export default function getTimeDepth(critera) {
  switch (critera) {
    case "week":
      return Timestamp.fromDate(
        new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7)
      );
    case "month":
      return Timestamp.fromDate(
        new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())
      );
    case "halfYear":
      return Timestamp.fromDate(
        new Date(now.getFullYear(), now.getMonth() - 6, now.getDate())
      );
    case "fullYear":
      return Timestamp.fromDate(
        new Date(now.getFullYear() - 1, now.getMonth(), now.getDate() - 7)
      );
    case "allTime":
      return Timestamp.fromDate(new Date(0));
    default:
      return Timestamp.fromDate(new Date(0));
  }
}
