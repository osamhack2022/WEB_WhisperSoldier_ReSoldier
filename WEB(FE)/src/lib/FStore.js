import { app } from "./FAuth";
import {
  getFirestore,
  query,
  collection,
  getDocs,
  limit,
  orderBy,
  startAfter,
} from "firebase/firestore";

export const dbService = getFirestore();

export const dbFunction = {
  query,
  collection,
  getDocs,
  limit,
  orderBy,
  startAfter,
};
