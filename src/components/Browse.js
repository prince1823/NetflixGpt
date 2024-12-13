import useAiringTodayMovies from "../hooks/useAiringTodayMovies";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useTrendingMovies from "../hooks/useTrendingMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import Header from "./Header";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import GPTSearch from "./GptSearch";
import { useSelector } from "react-redux";


const Browse = () => {
    const showGptSearch = useSelector(store=>store.gpt.showGptSearch);

    useNowPlayingMovies();
    usePopularMovies();
    useTrendingMovies(); 
    useTopRatedMovies();
    useUpcomingMovies();
    useAiringTodayMovies();
     // Hook is correctly called
    return (
        <div>
            <Header />
            {
                showGptSearch ? (<GPTSearch/>) : (
                    <>
                    <MainContainer/>
                    <SecondaryContainer/>
                    </>
                )
            }
        </div>
    );
};

export default Browse;
