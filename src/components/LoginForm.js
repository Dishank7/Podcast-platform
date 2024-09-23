
import { useState } from "react";
import Input from "./Input";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { auth , db , storage} from "../firebase"
import {setUser} from '../silces/userSlice'
import { toast } from "react-toastify";


const LoginForm = () => {

    const [email,setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [loading , setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const Login = async() =>{
        setLoading(true);
        if(email && password){
            try {
                const userCredential = await signInWithEmailAndPassword
                (auth,email,password);
                const user = userCredential.user
                
            const userDoc = await getDoc(doc(db,"users", user.uid));
            const userData = userDoc.data();
            console.log("userData:",userData)

                dispatch(setUser({
                    name:userData.name,
                    email:user.email,
                    uid:user.uid,
                    profileImg:user.profileImg
                }))
                
                toast.success("Login Successfull");
                navigate('/profile');

            } catch (error) {
                console.log(error);
                toast.error("Please Enter Valid credential");
            }
           setLoading(false);
        } else{
            toast.error("Enter Valid credential");
            setLoading(false);
        }
           
    }

    return(
        <>
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

                <button 
                className="sign-btn"
                onClick= {Login}
                disabled={loading}
                >{loading?"Loading...": "Login"}</button>
                
             </>   
        
    )
}

export default LoginForm