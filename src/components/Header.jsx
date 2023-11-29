import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { addUser, removeUser } from '../utils/userSlice';
import { useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from "./firebase.js";
import { LOGO } from '../utils/constants.js';





const Header= () => {
  const dispatch = useDispatch()
  const user = useSelector((appStore) => appStore.user);
  const navigate =useNavigate()
  const handleSignOut =() =>{
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
      console.log(error + 'signout')
    });

  }


  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName,photoURL } = user;
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
    return () =>unSubscribe()
  }, []);

  return (
    <div className='absolute w-screen bg-gradient-to-b from-black z-10 flex justify-between'>
      <img className='w-44' src ={LOGO} alt='netflex logo'/>
    {user && <div className='flex p-2 rounded-md justify-center '>
      <img  className= 'w-10 h-10 mr-2' src={user?.photoURL} alt='profileImaage'/> 
      <button onClick={handleSignOut} className='text-white'>Sign Out</button>
          </div> }
    </div>
  )
}

export default Header;