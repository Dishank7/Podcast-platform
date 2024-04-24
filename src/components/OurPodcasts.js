import { NavLink } from "react-router-dom"


const OurPodcasts = ({id , title , displayImage}) => {
    return(
        <>
        <NavLink to={`/podcast/${id}`}>
            <div className="podcast-card">
       
            <img className="display-image-podcast" src={displayImage}/>

            <p className="title-podcast">{title}</p>
         </div>
        </NavLink>
         
        </>
    )
}

export default OurPodcasts