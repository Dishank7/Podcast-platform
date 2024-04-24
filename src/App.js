

import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import { BrowserRouter , Routes , Route } from 'react-router-dom';
import { useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from './firebase';
import { useDispatch } from 'react-redux'
import { setUser } from './silces/userSlice';
import { onAuthStateChanged } from 'firebase/auth';
import PrivateRoutes from './components/PrivateRoutes';
import CreateAPoadCast from './pages/CreateAPodCast';
import Podcasts from './pages/Podcasts';
import PodCastDetails from './pages/PodCastDetails';
import CreateEpisode from './pages/CreateEpisode';

function App() {
    
   const dispatch = useDispatch();

   useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const unsubscribeSnapshot = onSnapshot(
          doc(db, "users", user.uid),
          (userDoc) => {
            if (userDoc.exists()) {
              console.log("User document exists");
              const userData = userDoc.data();
              dispatch(
                setUser({
                  name: userData.name,
                  email: userData.email,
                  uid: user.uid,
                })
              );
            } else {
              console.log("User document does not exist");
            }
          },
          (error) => {
            console.error("Error fetching user data:", error);
          }
        );
    
        return () => {
          unsubscribeSnapshot();
        };
      }
    });
    
    return () => {
      unsubscribe();
    };
  }, []);
  

  return (
    <div className="App">
      <BrowserRouter>
         <Routes>
              <Route path='/' element={<SignUp></SignUp>} />  
              <Route element={<PrivateRoutes/>}>
              
               <Route path='/profile' element={<Profile/>}/> 
              <Route path='/create-a-podcast' element={<CreateAPoadCast/>}/>
              <Route path='/podcasts' element={<Podcasts/>}/>
              <Route path='/podcast/:id' element={<PodCastDetails/>}/>
              <Route path='/podcast/:id/create-episode' element={<CreateEpisode/>}/>
             
             
              </Route> 
             
         </Routes>
      
      </BrowserRouter>
    </div>
  );
}

export default App;
