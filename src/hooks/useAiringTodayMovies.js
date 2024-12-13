import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { useEffect } from "react";
import { addAiringTodayMovies } from "../utils/moviesSlice";
const useAiringTodayMovies = () =>{
const dispatch = useDispatch();

    const getAiringTodayMovies = async()=>{
        const data = await fetch('https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1', API_OPTIONS)
    const json = await data.json();
    console.log(json.results)
    dispatch(addAiringTodayMovies(json.results))
}
useEffect(()=>{
  getAiringTodayMovies()
},[]) 
}

export default useAiringTodayMovies;
