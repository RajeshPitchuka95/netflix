import {useEffect} from 'react'
import Header from './Header'
import { onAuthStateChanged} from 'firebase/auth'
import { auth } from "./firebase.js";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice.js";
import { useNavigate } from 'react-router-dom';


const Browse = () => {
  const dispatch = useDispatch()
  const navigate =useNavigate()


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName,photoURL } = user;
        console.log(uid,email,displayName)
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL:photoURL
          })
        );
        navigate("/browse");
      } else {
          dispatch(removeUser());
          navigate("/");
      }
    });
  }, []);
  return (
    <div>
      <Header/>
    </div>
  )
}

export default Browse