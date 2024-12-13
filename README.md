#netflixgpt
create react app
configure tailwindcss into our project by running the commands copied from the tailwindcss website 
phir saare componenets bnanenge or bekaar k files delete krdenge(body,browse,login,header bnaenge )
body k andr browse or login ko import krdenge
->ab routes bnaenge body wali file m jaakr 
->now after the routes we will make a header for the login screen
->now header has been build with bg image and netflix logo on header 
->now we will make login form
we will create login form i.e sign in form in login.js file and apply all the tailwind according to the original website of netflix 
->now we will make sign up form 
-> and learn how to toggle between same form but some text content changes i.e sign in and sign up , i have added comments into the code to understands how the things work.
->now we will do form validation , also we will understand what is useRef
->now we will show the error message on the sign in sign up form rather on the console of browser
->now we will do authentication for this we need a backend and for this we will use google firebase



->firebase 
    ->go to google firebase website , add new project and run the command in your terminal npm install firebase
    ->after this on the website there is a code written ,copy the code and make a new folder in the utils named as firebase.js and paste the code in it
    ->now in the website go for authentication and enable authentication from various options like fb,github,email/password
    ->now come on the vs code run npm install -g firebase tools
    then firebase login , select your gmail and in projects select existing projects
    public directory will be BUILD
    Configure as a single-page app (rewrite all urls to /index.html)? No
    Set up automatic builds and deploys with GitHub? No
    then firebase init and select option as hosting
    then firebase deploy 
    NOW OUR PROJECT HAS BEEN DEPLOYED USING THE FIREBASE AND A LINK HAS BEEN GENERATED
    we will change the name of the link generated according to us in the firebase profile go to hosting option and buy the domain name like princenetflix.com according to you and verify it and then your website link will be this.

->create signup user account linked with our firebase
->create sign in user account linked with our firebase


->now we will use redux to store the object of user data 
    npm i -D @reduxjs/toolkit
    npm i react-redux
    now in utils make a folder appstore.js
    mmake a new folder also named as userslice and link the appstore component in it
    now in app.js provide appstore using provider 
    now in console a user object is created where all the details of username and password is stored as object
    now we have used useDipatch hook to dispatch the uid ,email,displayname 
    then we have used the navigate hook which is used when we click on sign in it will help us redirect to browse page
    Bugfix: if the user is not logged in redirect /browse to login page and vice versa
    unsubscribed to the onauthstatechanged callback

    -noe make a constant.js folder to store the images url and then export it wherever it is needed

    Now we will build the homepage 
    -we will get the movie data from TMDB ,we will use its API
    -register for tmdb api & create an app & get access token
    -now go to documentation and select now playing movies and on thje right side of this page
    -select javascript it will give an api call which we will copy and then paste into our constants.js folder 
    -now make this api call in the browse.js file
    - after making the api call in the browse we will store in our local using moviesSlice and then store the object in our appStore
    - now after this our browse.js is so ugly so we will shift the api call logic outside this folder using a new custom hook
    -we have a  created our hook useNowPlayingMovies and paste the api call code inside it and export it 
    -now in browse.js we just want to call this hook
NOW BROWSE PAGE Build starts
     -MainContainer
        -VideoBackground
        -VideoTitle
    - SecondaryContainer
        -MovieList * n
           - cards * n

    -fetch data for trailer video 
    - update store with trailer video data
    - embedded the youtube video and make it autoplay and mute 
    - tailwind classes to make maincontainer look awesome 

now we will build our secondarycontainer
    -movielist - popular
        - moviecard * n
    -movielist- nowplaying
    -movielist - trending 
    -movielist - error
-build the secondary container
-build movie card
-tmdb image cdn url
-made the browse page amazing with tailwind css
-usePopularMovies custom hooks to show random movies not hard coded directly from the api from tmdb website


NOW WE WILL BUILD GPT PART
  -building gpt search part
  -GPT search page
  -GPT search bar
  -Multi language feature in our app
  -integrate gpt API's











#features
-Login/Sign up Page
  - Sign In/ Sign up Form
  - redirect to browse page
-browse (after authentication)
  -header
  -main movie
     - trailer in background
     - title and description
     - Movie suggestion
        - MovieList * N (vertically scrollable)
-NetflixGPT
   -Search Bar
   -Movie Suggestion




