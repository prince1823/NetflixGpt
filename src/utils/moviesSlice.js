import { createSlice } from "@reduxjs/toolkit";




const moviesSlice = createSlice({
    name: "movies",
    initialState: {
        nowPlayingMovies: null,
        popularMovies: null, // Add this to the initial state
        trailerVideo: null,
        trendingMovies:null,
        topRatedMovies:null,
        upcomingMovies:null,
        airingTodayMovies:null,
       
    },
    reducers: {
        addnowPlayingMovies: (state, action) => {
            state.nowPlayingMovies = action.payload;
        },
        addPopularMovies: (state, action) => {
            state.popularMovies = action.payload; // Fix this line
        },
        addTrailerVideo: (state, action) => {
            state.trailerVideo = action.payload;
        },
        addTrendingMovies: (state, action) => {
            state.trendingMovies = action.payload;
        },
        addTopRatedMovies: (state, action) => {
            state.topRatedMovies = action.payload;
        },
        addUpcomingMovies: (state, action) => {
            state.upcomingMovies = action.payload;
        },
        addAiringTodayMovies: (state, action) => {
            state.airingTodayMovies = action.payload;
        },
    },
});

export const { addnowPlayingMovies,addAiringTodayMovies, addPopularMovies, addTrailerVideo ,addTrendingMovies,addTopRatedMovies,addUpcomingMovies} = moviesSlice.actions;
export default moviesSlice.reducer;
