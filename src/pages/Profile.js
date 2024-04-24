import { useSelector } from "react-redux"
import Header from "../components/Header";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify";
import Loader from "../components/Loader";



const Profile = () => {
 const userData = useSelector((state)=>state.user.user);

  console.log(userData);

 const handleLogout = () => {
   
  signOut(auth).then(() => {
    // Sign-out successful.
    toast.success("Logged out Successfull")
  }).catch((error) => {
    // An error happened.
    toast.error(error.message);
  });

 }
    
   if(!userData){
    return <Loader/>
   }

  return(
        <>
        <Header></Header>
        <div className="wrapper-div">
        <h1>{userData.name.toUpperCase()}</h1>
        <div className="profile-img-div">
          <img src={userData.profileImg} className="profile-img"/>
        </div>
        <button onClick={handleLogout} className="Logout-btn">Logout</button>
        </div>
       
        </>
    )

}

export default Profile