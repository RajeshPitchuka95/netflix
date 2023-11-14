import  { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validation";
import { auth } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice.js";

function Login() {
  const [isSignIn, setSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const navgate = useNavigate();
  const dispatch = useDispatch();

  const handleToggleButton = () => {
    setSignIn(!isSignIn);
  };

  const handleSubmitForm = () => {
    const error = checkValidData(email.current.value, password.current.value);
    setErrorMessage(error);
    if (error) return;
    if (!isSignIn) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value,      
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value, photoURL: "https://avatars.githubusercontent.com/u/149673127?s=400&u=131d3921fc8856e7baffcf6f6c694b0ef70f311c&v="
          }).then(() => {
            const {uid,email,displayName,photoURL} = auth.currentUser;
            dispatch(
              addUser({
                uid: uid,
                email: email,
                displayName: displayName,
                photoURL:photoURL
              })
            );
            navgate("/browse");
          }).catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
      })
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          if (user) {
            navgate("/browse");
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/ab4b0b22-2ddf-4d48-ae88-c201ae0267e2/0efe6360-4f6d-4b10-beb6-81e0762cfe81/IN-en-20231030-popsignuptwoweeks-perspective_alpha_website_small.jpg"
          alt="body"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute w-3/12 p-12 bg-black my-36 mx-auto right-0 left-0 text-white bg-opacity-75"
      >
        <h1 className="font-bold text-3xl py-3">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignIn && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-2 bg-gray-700 rounded-lg my-2 w-full"
          ></input>
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email or phone Number"
          className="p-2 bg-gray-700 rounded-lg my-2 w-full"
        ></input>
        <input
          ref={password}
          type="Password"
          placeholder="Password"
          className="p-2 my-3 w-full bg-gray-700 rounded-lg"
        ></input>
        <button
          className="p-2 my-4 bg-red-700 w-full rounded-lg"
          onClick={handleSubmitForm}
        >
          {isSignIn ? "Sign In" : "Sign Up"}
        </button>
        <p className="text-red-500">{errorMessage}</p>
        <p className="py-4 cursor-pointer" onClick={handleToggleButton}>
          {isSignIn
            ? "New to Netflix? Sign Up Now"
            : "Already Registered? sign in"}
        </p>
      </form>
    </div>
  );
}

export default Login;
