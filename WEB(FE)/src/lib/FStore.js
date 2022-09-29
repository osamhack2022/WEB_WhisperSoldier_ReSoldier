import { app } from "./FAuth";
import { getFirestore } from "firebase/firestore"

export const dbService = getFirestore();