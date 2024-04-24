import { useState } from "react";


const CustomInput = ({accept,id,fileHandlefnc,text}) => {
    const[fileSelected , setFileSelected] = useState("");

    const onChange = (e) => {
        setFileSelected(e.target.files[0].name);
        fileHandlefnc(e.target.files[0]);
    }

    return(
        <>
        <label htmlFor={id} className="custom-input" >
            {fileSelected ? fileSelected : text}
        </label>
        <input
          type="file"
          accept={accept} 
          id={id} 
          style={{display:"none"}}
          onChange={onChange}/>
        </>
    )
}

export default CustomInput;