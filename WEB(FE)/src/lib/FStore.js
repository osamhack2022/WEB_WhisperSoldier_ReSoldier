import { app } from "./FAuth";
import {
  getFirestore,
  query,
  collection,
  getDocs,
  getDoc,
  limit,
  orderBy,
  startAfter,
  doc,
  updateDoc,
  deleteDoc,
  addDoc,
  serverTimestamp,
  where,
  increment,
  onSnapshot,
  arrayUnion,
} from "firebase/firestore";

export const dbService = getFirestore();

export const dbFunction = {
  query,
  collection,
  getDocs,
  getDoc,
  limit,
  orderBy,
  startAfter,
  doc,
  updateDoc,
  deleteDoc,
  addDoc,
  serverTimestamp,
  where,
  increment,
  onSnapshot,
  arrayUnion,
};
