import { sizes } from "../modules/MediaQuery";
import { FApiKey } from "./FAuth";

export const regex = /^\d{13}@narasarang.or.kr$/;
export const BigDesktopQuery = `(min-width:1500px)`;
export const DesktopQuery = `(min-width:1200px)`;
export const SmallDesktopQuery = `(min-width:900px)`;
export const TabletQuery = `(min-width:768px)`;

export const whisperSodlierSessionKey = `firebase:authUser:${FApiKey}:[DEFAULT]`;
export const adminSessionKey = `firebase:admin:${FApiKey}:[DEFAULT]`;
