import React, { useContext } from "react";

import Button from "@material-tailwind/react/Button";

import { useHistory } from "react-router-dom";

import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { auth, firestore } from "../../fireabase/config";
import { setDoc, serverTimestamp, doc } from "firebase/firestore";

// importing firebase context
import { AuthContext } from "../../context/firebase";

const Login = () => {
  //get the user state from the context
  const { setUser } = useContext(AuthContext);
  const history = useHistory();
  onAuthStateChanged(auth, (user) => {
    if (user) history.push("/");
  });

  const login = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then(({ user }) => {
        const docRef = doc(firestore, "users", `${user?.uid}`);
        setDoc(
          docRef,
          {
            lastLogin: serverTimestamp(),
            name: user?.displayName,
            email: user?.email,
            number: user?.phoneNumber,
          },
          { merge: true },
          (doc) => console.log(doc)
        );
        console.log(user);
        setUser(user);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-100 min-h-screen">
        <img
          src="https://links.papareact.com/1ui"
          height="300"
          width="550"
          alt="logo"
        />
        <Button
          className="w-44 mt-10 "
          color="blue"
          buttonType="filled"
          ripple="light"
          onClick={login}
        >
          Login
        </Button>
      </div>
    </>
  );
};

export default Login;
