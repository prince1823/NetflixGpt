import { useState, useRef } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { USER_AVATAR } from "../utils/constants";
import { BG_URL } from "../utils/constants";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true); // Toggle between sign in and sign up form 
  const [errorMessage, setErrorMessage] = useState(null);
  const email = useRef(null); 
  const password = useRef(null);
  const name = useRef(null);
  const dispatch = useDispatch();

  const handleButtonClick = async () => {
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return; // If invalid data, return early

    try {
      if (!isSignInForm) {
        // Sign Up Flow
        await createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
          .then((userCredential) => {
            // Signed up successfully
            const user = userCredential.user;
            updateProfile(user, {
              displayName: name.current.value,
              photoURL: USER_AVATAR,
            }).then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(addUser({ uid, email, displayName, photoURL }));
            }).catch((error) => {
              setErrorMessage(error.message);
            });
          })
          .catch((error) => {
            if (error.code === "auth/email-already-in-use") {
              setErrorMessage("This email is already in use. Please sign in or use a different email.");
            } else {
              setErrorMessage(error.message); // Display other errors
            }
          });
      } else {
        // Sign In Flow
        await signInWithEmailAndPassword(auth, email.current.value, password.current.value)
          .then((userCredential) => {
            // Signed in successfully
            const user = userCredential.user;
          })
          .catch((error) => {
            setErrorMessage(error.message);
          });
      }
    } catch (error) {
      console.error(error.message);
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm); // Toggle between sign in and sign up forms
  };

  return (
    <div>
      <Header />
      <div className="absolute"> 
        <img
          src={BG_URL}
          alt="logo"
        />
      </div>

      <form 
        onSubmit={(e) => e.preventDefault()}  // Prevent page refresh on form submission
        className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignInForm && (  // Only show this field in sign up form
          <input 
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 w-full bg-gray-700"
            ref={name} // Reference the name field for sign up
          />
        )}

        <input 
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-4 my-4 w-full bg-gray-700"
        />

        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-700"
        />
        
        <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>  

        <button 
          className="p-4 my-4 bg-red-700 w-full rounded-lg" 
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        <p className="py-4 cursor-pointer underline" onClick={toggleSignInForm}>
          {isSignInForm ? "New to Netflix? Sign Up Now" : "Already registered? Sign In Now."}
        </p>
      </form>
    </div>
  );
};

export default Login;
