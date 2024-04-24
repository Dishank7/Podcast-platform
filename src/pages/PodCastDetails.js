import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { collection, doc, getDoc, onSnapshot, query } from "firebase/firestore";
import { toast } from "react-toastify";
import { auth, db } from "../firebase";
import EpisodeDetails from "../components/EpisodeDetails";
import AudioPlayer from "../components/AudioPlayer";

const PodCastDetails = () => {
    
    const{id} = useParams()
    const navigate = useNavigate();
    const [podcast , setPocasts] = useState({});
    const [episode , setEpisodes] = useState([]);
    const [playingFile , setPlayingFile] = useState("")
    console.log(podcast);
    useEffect(()=>{
       
     if(id){
       getData()
     }

    },[id])   

     const getData = async () => {
 
           try {
            const docRef = doc(db,"podcasts",id);
            const docSnap = await getDoc(docRef);
    
            if(docSnap.exists()){
                console.log("Document data:", docSnap.data());
              setPocasts({id:id, ...docSnap.data()})
    
            }else{
                console.log("No data Found");
                toast.error("No data Found")
                navigate("/podcasts")
            }
           } catch (error) {
            toast.error(error.message);
           }
     }

     useEffect(()=>{
      const unsubscribe = onSnapshot(
        query(collection(db,"podcasts",id,"episodes")),
        (querySnapshot)=>{
          const episodeData = [];
          querySnapshot.forEach((doc)=>{
            episodeData.push({id:doc.id,...doc.data()});
          });
          setEpisodes(episodeData);
        },
        (error)=>{
          console.log(error);
        }
      );

      return ()=>{
        unsubscribe();
      }
     },[id]);

    return(
        <>
        <Header/>
        <div className="podcast-details-div">
        {
        podcast.id && (
         <>
         {
            podcast.createdBy == auth.currentUser.uid && <button 
               onClick={()=>{navigate(`/podcast/${id}/create-episode`)}}
               className="btn-podcast">
               Create Episode</button>
         }
         
         <h1>{podcast.title}</h1>
         <img src={podcast.bannerImage}/>
         <p className="podcast-desc">
           {podcast.description}
         </p>
         <h1>Episodes</h1>
         {
          episode.length > 0 ? (
            <>
              {episode.map((episode)=>{
                return(
               <EpisodeDetails
              title={episode.title}
              description={episode.description}
              audioFile={episode.audioFile}
          onClick={(file)=> setPlayingFile(file)}
                  />
                )
              })}
          </>
          ):(
            <p>No Episodes</p>
          )}
         </>
        )}
  </div>
        
     {
      playingFile && <AudioPlayer 
                      audioSrc={playingFile} 
                      image={podcast.displayImage}/>
     }
        
        </>
    )
}

export default PodCastDetails