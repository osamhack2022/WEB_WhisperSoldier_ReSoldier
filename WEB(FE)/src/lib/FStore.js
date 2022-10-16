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
  setDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

export const dbService = getFirestore();

export const storageService = getStorage(app);

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
  setDoc,
};

export const storageFunction = {
  ref,
  uploadString,
  getDownloadURL,
  deleteObject,
};
