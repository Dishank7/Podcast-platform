import { useEffect, useRef, useState } from "react"
import {FaPlay , FaPause , FaVolumeUp , FaVolumeMute} from "react-icons/fa"


    const AudioPlayer = ({audioSrc , image}) => {
    const [isPlaying , setIsPlaying] = useState(true);
    const [isMute , setIsMute] = useState(false);
    const [duration , setDuration] = useState(0);
    const [currentTime , setCurrentTime] = useState(0)
    const [volume , setVolume]  = useState(1);
    const audioRef = useRef()

   const handleDuration = (e) =>{
    setCurrentTime(e.target.value)
    audioRef.current.currentTime = e.target.value;
   }
    
   const togglePlay = () =>{
    if(isPlaying){
      setIsPlaying(false);
    }else{
      setIsPlaying(true);
    }
   };

   const toggleMute = () =>{
    if(isMute){
      setIsMute(false)
    }else{
      setIsMute(true);
    }
   }

   const handleVolume = (e) =>{
    setVolume(e.target.value)
    setIsMute(false);
    audioRef.current.volume = volume;
   }

  //  useEffect(()=>{
  //   setDuration(audioRef.current.duration);
  //  },[audioRef])

  useEffect(()=>{
   const audio = audioRef.current;
   audio.addEventListener("timeupdate", handleTimeUpdate);
   audio.addEventListener("loadedmetadata", handleLoadedMetadata);
   audio.addEventListener("ended", handleEnded);

  },[])

  const handleTimeUpdate = () =>{
setCurrentTime(audioRef.current.currentTime);
  }

  const handleLoadedMetadata = () =>{
  setDuration(audioRef.current.duration);
  }
  
  const handleEnded = () =>{
  setCurrentTime(0);
  setIsPlaying(false);
  }

   useEffect(()=>{
    if(isPlaying){
      audioRef.current.play();
    }else{
      audioRef.current.pause();
    }
   },[isPlaying]);

   useEffect(()=>{
    if(isMute){
      audioRef.current.volume = 0;
      setVolume(0);
    }else{
      audioRef.current.volume = volume;
      setVolume(1);
    }
   },[isMute]);

   const formatTime = (time) => {
    const minute = Math.floor(time/60);
    const seconds = Math.floor(time % 60);
    return `${minute} : ${seconds < 10 ? '0':""}${seconds}`;
   }

    return (
       <div className="custom-audio-wrapper">
          <img src={image}/>
          <audio ref={audioRef} src={audioSrc}/>
          <p onClick={togglePlay}>{isPlaying ? <FaPause/> : <FaPlay/>}</p>
          <div className="duration-div">
            <p>{formatTime(currentTime)}</p>
             <input 
             type="range"
             max={duration}
             value={currentTime}
             min={0}
             onChange={handleDuration}
             className="duration-range"/>
            <p>-{formatTime(duration-currentTime)}</p>
          </div>
          <p onClick={toggleMute}>{!isMute ? <FaVolumeUp/> : <FaVolumeMute/>}</p>
          <input 
             type="range"
             value={volume}
             max={1}
             min={0}
             step={0.01}
             onChange={handleVolume}
             className="volume-range"/>
       </div>
     )
}

export default AudioPlayer