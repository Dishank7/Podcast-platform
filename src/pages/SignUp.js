import { useState } from "react";
import Header from "../components/Header";
import SignUpForm from "../components/SignUpForm";
import LoginForm from "../components/LoginForm";



const SignUp = () =>{

    const [flag , setFlag] = useState(false);


    return(
        <div className="signUp-div" style={{marginBottom:"20px"}}>
            <Header></Header>
            <div className="wrapper-div">
                {(flag == true && <h1>Login</h1>)||
                 (flag == false && <h1>SignUp</h1>)
                }
                {
                    flag ? <LoginForm/> : <SignUpForm/>
                }       
           {
            (flag == false && <p onClick={()=>setFlag(true)}>Already have an account ? Click here to Login </p>) ||
            (flag == true && <p onClick={()=>setFlag(false)}>Don't have an account ? Click here to SignIn </p>)     
           }
            </div>
        </div>
    )
}

export default SignUp;