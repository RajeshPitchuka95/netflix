import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { removeUser } from '../utils/userSlice';




const Header= () => {
  const dispatch = useDispatch()
  const user = useSelector((appStore) => appStore.user);
  console.log(user,'user')
  const navigate =useNavigate()
  const handleSignOut =() =>{
    navigate("/")
    dispatch(removeUser())
  }



  return (
    <div className='absolute w-screen bg-gradient-to-b from-black z-10 flex justify-between'>
      <img className='w-44' src ="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png" alt='netflex logo'/>
    {user && <div className='flex p-2 rounded-md justify-center '>
      <img  className= 'w-10 h-10 mr-2' src={user?.photoURL} alt='profileImaage'/> 
      <button onClick={handleSignOut} className='text-white'>Sign Out</button>
          </div> }
    </div>
  )
}

export default Header;