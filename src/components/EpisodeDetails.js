
const EpisodeDetails = ({title, description , audioFile , onClick}) => {

    return(
        <>
        <ol>
        <div className="episode-wrapper">
        <h1> <li>{title}</li></h1>
        <p>{description}</p>
        <button onClick={()=>onClick(audioFile)}>Play Episode</button>
        </div>
        </ol>
        </>
    )
}

export default EpisodeDetails