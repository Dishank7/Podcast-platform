import { useEffect, useState } from "react";
import Header from "../components/Header";
import { collection, doc, onSnapshot, query } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { setPodcast } from "../silces/podcastSlice";
import { db } from "../firebase";
import OurPodcasts from "../components/OurPodcasts";
import Input from "../components/Input";

const Podcasts = () => {

 const dispatch = useDispatch();
 const podcasts = useSelector((state)=>state.podcast.podcast)
 const [search , setSearch] = useState("");


  useEffect(()=>{
   const unsubscribe =  onSnapshot(
    query(collection(db,"podcasts")),
    (querySnapshot)=>{
        const podcastData = [];
        querySnapshot.forEach((doc)=>{
            podcastData.push({id:doc.id , ...doc.data()});
        });
        dispatch(setPodcast(podcastData));
    },
    (error)=>{
        console.error("Error fetching podcasts:", error);
    }
   );
   
    return () => {
        unsubscribe()
    }

  },[dispatch]);

  var filterPodcasts = podcasts.filter((item)=> item.title.trim().toLowerCase().includes(search.toLowerCase()));

    return(
        <>
        <Header/>
         <div className="wrapper-div">
           <h1>Discover Podcasts</h1>

                 <Input 
                state={search}
                setState={setSearch}
                placeholder={"Search By Title"}
                type={'text'}     
                ></Input>

           {filterPodcasts.length > 0 ? 
           <div className="podcast-flex">
             {filterPodcasts.map((item)=>{
                return <OurPodcasts 
                       id={item.id}
                       title={item.title}
                       displayImage={item.displayImage}
                     />
             })}
           </div>  :
           <p>No current Podcasts</p>}
         </div>

        </>
    )
}

export default Podcasts;