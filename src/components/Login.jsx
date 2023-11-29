import  { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validation";
import { auth } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice.js";
import { HOME_BACKGROUND_IMAGE, USER_AVATAR } from "../utils/constants.js";

function Login() {
  const [isSignIn, setSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
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
            displayName: name.current.value,photoURL: USER_AVATAR
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
          src={HOME_BACKGROUND_IMAGE}
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
