import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Input from "./Input";
import { toast } from "react-toastify";
import CustomInput from "./CustomInput";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db , auth, storage } from "../firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

const PodcastFrom = () =>{

    const [title , setTitle] = useState('');
    const [desc,setDesc] = useState('');
    const [displayImage , setDisplayImage] = useState('');
    const [bannerImage , setBannerImage] = useState('')
 
    const [loading , setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

   const handleSubmit = async ()=>{
      //toast.success("Podcast Created");
     
      if(title && desc && displayImage && bannerImage){
       setLoading(true);
       try { 
        const bannerImageRef = ref(storage,`podcast/${auth.currentUser.uid}/${Date.now()}`);
        await uploadBytes(bannerImageRef , bannerImage);
        console.log(bannerImageRef)
        const bannerImageURL = await getDownloadURL(bannerImageRef);
        console.log(bannerImageURL)

        const displayImageRef = ref(storage,`podcast/${auth.currentUser.uid}/${Date.now()}`);
        await uploadBytes(displayImageRef , displayImage);
        const displayImageURL = await getDownloadURL(displayImageRef)

        const podcastData = {
          title:title,
          description:desc,
          bannerImage:bannerImageURL,
          displayImage:displayImageURL,
          createdBy:auth.currentUser.uid,
        }

         await addDoc(collection(db,"podcasts"),podcastData);

        setTitle("");
        setDesc("");
        setBannerImage('');
        setDisplayImage('');

       toast.success("Image uploaded");
       setLoading(false);
       navigate('/podcast')
        
       } catch (error) {
        toast.error(error.message)
        setLoading(false)
       }
        }else{
        toast.error("Please Enter All values");
        setLoading(false);
      }
   }

   const displayImagehandle = (file) => {
    setDisplayImage(file)
   }

   const bannerImagehandle = (file) => {
    setBannerImage(file)
   }

    return(
        <>
                <Input 
                state={title}
                setState={setTitle}
                placeholder={"Title"}
                type={'text'}
                required={true}     
                ></Input>
                <Input 
                state={desc}
                setState={setDesc}
                placeholder={"Description"}
                type={'text'}
                required={true}     
                ></Input>
                 <CustomInput 
                 accept={"image/*"}
                 id="display-image-input"
                 fileHandlefnc={displayImagehandle}
                 text={"Display Image Upload"}/>
                 <CustomInput 
                 accept={"image/*"}
                 id="banner-image-input"
                 fileHandlefnc={bannerImagehandle}
                 text={"Banner Image Upload"}/>

                <button 
                className="sign-btn"
                onClick= {handleSubmit}
                disabled={loading}
                >{loading?"Loading...": "Create A Podcast"}</button>
              
        </>
    )
};

export default PodcastFrom