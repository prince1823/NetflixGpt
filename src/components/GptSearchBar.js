import { useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { useRef, useState } from "react";
import openai from "../utils/openai";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
    const langKey = useSelector((store) => store.config.lang);
    const searchText = useRef(null);
    const searchMovieTMDB = async (movie) =>{
      const data = await fetch("https://api.themoviedb.org/3/search/movie?query="+ movie +"&include_adult=false&language=en-US&page=1",API_OPTIONS)
      const json = await data.json()
      return json.results;
    }
    const [loading, setLoading] = useState(false); // Added loading state

    const handleGptSearchClick = async () => {
        const query = searchText.current.value.trim(); // Trim unnecessary whitespace

        if (!query) {
            console.log("Search text is empty");
            return; // Prevent API call if input is empty
        }

        if (loading) return; // Prevent duplicate calls while already loading

        setLoading(true);

        try {
            console.log("Search text:", query);
            const gptQuery =
                "Act as a Movie Recommendation System and suggest some movies for the query " +
                query +
                ". Only give me names of 5 movies, comma separated like the example result giving ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

            // Make an API call to GPT
            const gptResults = await openai.chat.completions.create({
                messages: [{ role: "user", content: gptQuery }],
                model: "gpt-3.5-turbo",
            });

            console.log(gptResults.choices?.[0]?.message?.content);
            const gptMovies = gptResults.choices?.[0]?.message?.content.split(" , ")

            const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
            const tmdbResults = await Promise.all(promiseArray)
            console.log(tmdbResults);
            dispatchEvent(addGptMovieResult({movieNames: gptMovies,movieResults:tmdbResults}))
        } catch (error) {
            console.error("Error fetching GPT results:", error);
        } finally { 
            setLoading(false); // Reset loading state 
        }
    };

    return (
        <div className="pt-[10%] flex justify-center">
            <form
                className="w-1/2 bg-black grid grid-cols-12"
                onSubmit={(e) => e.preventDefault()}
            >
                <input
                    ref={searchText}
                    type="text"
                    className="p-4 m-4 col-span-9"
                    placeholder={lang[langKey].gptSearchPlaceholder}
                />
                <button
                    className={`col-span-3 m-4 py-2 px-4 text-white rounded-lg ${
                        loading ? "bg-gray-400" : "bg-red-700"
                    }`}
                    onClick={handleGptSearchClick}
                    disabled={loading} // Disable button while loading
                >
                    {loading ? "Loading..." : lang[langKey].search}
                </button>
            </form>
        </div>
    );
};

export default GptSearchBar;
