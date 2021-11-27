import React, { useContext, useEffect } from "react";

import Button from "@material-tailwind/react/Button";

import { useHistory } from 'react-router-dom';

import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { auth, firestore } from '../../fireabase/config';
import { setDoc, serverTimestamp, doc } from 'firebase/firestore';

// importing firebase context
import { AuthContext } from "../../context/firebase";

const Login = () => {
    //get the user state from the context
    const { user, setUser } = useContext(AuthContext);
    const history = useHistory();
    onAuthStateChanged(auth, (user) => {
        if (user) history.push("/");
    });

    const login = () => {
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
            .then(({ user }) => {
                console.log(user);
                setUser(user);
            })
            .catch((err) => console.log(err));
    };
    const docRef = doc(firestore, "users", `${user?.uid}`);

    useEffect(() => {
        const unsub = setDoc(
            docRef,
            {
                lastlogin: serverTimestamp(),
                saved: [],
            },
            { merge: true },
            (doc) => console.log(doc)
        );
        return () => unsub;
    }, [user, docRef]);
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