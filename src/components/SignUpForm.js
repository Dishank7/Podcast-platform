
import { useState } from "react";
import Input from "./Input";
import { auth , db , storage} from "../firebase"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import {setUser} from '../silces/userSlice'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CustomInput from "./CustomInput";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";


const SignUpForm = () => { 


    const [name , setName] = useState('');
    const [email,setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [userImg , setUserImg] = useState()
    const [confirmPassword , setConfirmPassword] = useState('')
    const dispatch = useDispatch()
    const [loading , setLoading] = useState(false);
    const navigate = useNavigate();
    

    const SignUp = async () => {
        console.log("Signing in...");
        setLoading(true);

        if(password == confirmPassword && password.length>=6){
            try {
                const userCredential = await createUserWithEmailAndPassword
                (auth,email,password);
                const user = userCredential.user

                const profileImageRef = ref(storage,`user/${auth.currentUser.uid}/${Date.now()}`);
                await uploadBytes(profileImageRef , userImg);
                const profileImageURL = await getDownloadURL(profileImageRef)
                console.log(profileImageURL);

                await setDoc(doc(db,"users", user.uid),{
                    name:name,
                    email:user.email,
                    uid:user.uid,
                    profileImg:profileImageURL
                })

                dispatch(setUser({
                    name:name,
                    email:user.email,
                    uid:user.uid,
                    profileImg:profileImageURL
                }))

                
                toast.success(
                    "Signin successful"
                )
                setLoading(false)
                navigate('/profile');

            } catch (error) {
                console.log(error);
                toast.error(error.message);
                setLoading(false);
            }
     } else {
        //throw error
        if(password != confirmPassword){
            toast.error("ConfirmPassword should be same as Password");
        }else if(password.length < 6){
               toast.error(
                "Make sure password should have atleast 6 character"
               );
        }
        setLoading(false);
     }
    }

    const profileImghandle = (file) =>{
        setUserImg(file)
    }

    return(
        <>
                <Input 
                state={name}
                setState={setName}
                placeholder={"Full Name"}
                type={'text'}
                required={true}     
                ></Input>
                <Input 
                state={email}
                setState={setEmail}
                placeholder={"Email"}
                type={'text'}
                required={true}     
                ></Input>
                <Input 
                state={password}
                setState={setPassword}
                placeholder={"Password"}
                type={'password'}
                required={true}     
                ></Input>
                <Input 
                state={confirmPassword}
                setState={setConfirmPassword}
                placeholder={"ConfirmPass"}
                type={'password'}
                required={true}     
                ></Input>
                <CustomInput
                accept={"image/*"}
                id="profile-image-input"
                fileHandlefnc={profileImghandle}
                text={"Profile Image Upload(optional)"}/>
                <button 
                className="sign-btn"
                onClick= {SignUp}
                disabled={loading}
                >{loading?"Loading...": "Signup"}</button>
                </>
    )
}


export default SignUpForm