import { getApp, getApps, initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINE_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// firebase :initiate the app
export const app =
  getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

// cloud storage db
export const database = getStorage(app);
