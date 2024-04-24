import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header"
import { useState } from "react";
import { useDispatch } from "react-redux";
import Input from "../components/Input";
import CustomInput from "../components/CustomInput";
import { toast } from "react-toastify";
import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";

const CreateEpisode = () => {
   
    const {id} = useParams();
    const [title , setTitle] = useState('');
    const [desc,setDesc] = useState('');
    const [audioFile , setAudioFile] = useState('');

    const [loading , setLoading] = useState(false);

    const navigate = useNavigate()
    const dispatch = useDispatch();

    const audioFileHandle = (file) => {
        setAudioFile(file);
    }

    const handleSubmit = async () => {
        setLoading(true)
        if({title, desc , audioFile}){
           try {
            const audioRef = ref(
                storage,
                `podcast-episode/${auth.currentUser.uid}/${Date.now()}`
            );
            await uploadBytes(audioRef , audioFile);

            const audioURL = await getDownloadURL(audioRef);
            const episodeData = {
                title,
                description:desc,
                audioFile:audioURL,
            };
            await addDoc(
                collection(db,"podcasts",id , "episodes"),episodeData
            )
             toast.success("Episode Created");
             setLoading(false);
             navigate(`/podcast/${id}`);
             setTitle("");
             setDesc("");
             setAudioFile("");  
            
           } catch (error) {
            toast.error(error.message);
            setLoading(false);
           }
        }else{
            toast.error("All Files Should Be There");
            setLoading(false);
        }
    }

    return(
        <>
            <Header/>
              <div className="create-episode-wrapper">
               <div className="wrapper-div">
                <h1>Create Episode</h1>
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
                 accept={"audio/*"}
                 id="audio-file-input"
                 fileHandlefnc={audioFileHandle}
                 text={"Upload Audio Here"}/>

                    <button 
                className="sign-btn"
                onClick= {handleSubmit}
                disabled={loading}
                >{loading?"Loading...": "Create Episode"}</button>
               </div>

              </div>
                
        </>
    )
}

export default CreateEpisode