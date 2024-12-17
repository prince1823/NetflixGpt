import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useSelector, useDispatch } from "react-redux"; // Combined imports for redux hooks
import { addUser, removeUser } from "../utils/userSlice"; // Import both actions from userSlice
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((store) => store.user);
    const showGptSearch= useSelector((store) => store.gpt.showGptSearch)

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
            })  
            .catch(() => {
                navigate("/error"); // Navigate to error page if sign-out fails
            });
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { uid, email, displayName, photoURL } = user;
                dispatch(addUser({ uid, email, displayName, photoURL }));
                navigate("/browse");
            } else {
                dispatch(removeUser());
                navigate("/");
            }
        });

        return () => unsubscribe(); // Cleanup the listener on unmount
    }, []);

    const handleGptSearchClick = () =>{
dispatch(toggleGptSearchView())
    }
    const handleLanguageChange=(e) =>{
        dispatch(changeLanguage(e.target.value))
    }

    return (
        <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
            <img
                className="w-44"
                src={LOGO}
                alt="logo"
            />
            {user && (
                <div className="flex p-2">
                    {showGptSearch && (<select className="p-2 bg-gray-900 text-white m-2 rounded-lg" 
                    onChange={handleLanguageChange}>
                        {SUPPORTED_LANGUAGES.map((lang=> <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>))}
                    </select>)}
                    <button className="py-2 px-4 mx-4 my-2 bg-purple-800 text-white rounded-lg hover:bg-purple-900"
                    onClick = {handleGptSearchClick}>
                       {showGptSearch?"Homepage":" GPT Search"}</button>
                    <img
                        className="w-12 h-12 rounded-3xl mt-1"
                        alt="usericon"
                        src="https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg"
                    />
                    <button onClick={handleSignOut} className="my-2 ml-3 font-bold text-white text-lg bg-orange-600 px-4 rounded-lg hover:bg-red-700 transition-colors duration-1000">
                        Sign Out
                    </button>
                </div>
            )}
        </div>
    );
};

export default Header;
