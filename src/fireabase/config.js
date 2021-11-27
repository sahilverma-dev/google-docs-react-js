import { initializeApp } from "firebase/app";

import { getFirestore } from "@firebase/firestore";
import { getAuth } from "@firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFKkpY6J5inB9eI8gSFrgZxFp_AnTH9oM",
  authDomain: "docs-d125f.firebaseapp.com",
  projectId: "docs-d125f",
  storageBucket: "docs-d125f.appspot.com",
  messagingSenderId: "760604561008",
  appId: "1:760604561008:web:21df79493c1658cc8d6eb5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const auth = getAuth(app);

export { firestore, auth };
