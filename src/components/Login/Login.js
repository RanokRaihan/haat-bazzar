import React, { useContext } from "react";
import "./Login.css";

//firebase login import

import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";
import { userContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import useDocumentTitle from "../../useDocumentTitle";

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const Login = () => {
  //change title
  useDocumentTitle("Login - HaatBazar");
  const provider = new firebase.auth.GoogleAuthProvider();
  //context
  const [, setLoggedInUser] = useContext(userContext);

  //for redirect

  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

  //sign in function

  const handleSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        //console.log(result);
        const { name, email, picture } = result.additionalUserInfo.profile;
        const signedInUser = {
          isSignedIn: true,
          userName: name,
          email: email,
          picture: picture,
        };
        setLoggedInUser(signedInUser);
        getToken();
        history.replace(from);
      })
      .catch((error) => alert(error));
  };

  const getToken = () => {
    firebase
      .auth()
      .currentUser.getIdToken(/* forceRefresh */ true)
      .then((idToken) => {
        sessionStorage.setItem("token", idToken);
      })
      .catch(function (error) {
        // Handle error
      });
  };
  return (
    <div className='login-container'>
      <h1>Please Login first</h1>
      <button onClick={handleSignIn} className='btn btn-google'>
        Continue with google
      </button>
    </div>
  );
};

export default Login;
