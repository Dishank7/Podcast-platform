
import { useState } from "react"

const Input = ({type ,state, setState , placeholder , required}) => {

    return(

             <input 
             type={type} 
             value={state} 
             placeholder={placeholder}
              onChange={(e)=> setState(e.target.value)} required={required} className="custom-input"/>
        
    )
}

export default Input