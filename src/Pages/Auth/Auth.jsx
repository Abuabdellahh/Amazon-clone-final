import { useContext, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import classes from "./Signup.module.css";
import { auth } from "/src/Utility/firebase.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { DataContext } from "../../componentes/DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";

const Auth = () => {
  // State management for form inputs and UI states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loadingSignIn, setLoadingSignIn] = useState(false);
  const [loadingSignUp, setLoadingSignUp] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const navStateData = useLocation();
  // console.log(navStateData)

  // Access the user context and dispatch function
  const [{ user }, dispatch] = useContext(DataContext);

  // Load remembered email on component mount
  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

  // Handle both sign-in and sign-up
  const handleAuth = async (e, isSignUp) => {
    e.preventDefault();
    // Validate inputs
    if (!email || !password)
      return setError("Email and password are required.");
    setError("");

    // Set loading state based on action type
    if (isSignUp) {
      setLoadingSignUp(true);
    } else {
      setLoadingSignIn(true);
    }

    try {
      // Determine which Firebase auth method to use
      const action = isSignUp
        ? createUserWithEmailAndPassword
        : signInWithEmailAndPassword;

      // Attempt to authenticate
      const userInfo = await action(auth, email, password);

      // Handle "Remember me" functionality
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      // Dispatch user info to context/state management
      dispatch({
        type: Type.SET_USER,
        user: userInfo.user,
      });
      navigate(navStateData?.state?.redirect || "/");

      console.log(`${isSignUp ? "Sign-up" : "Sign-in"} successful`);
      // Redirect to home page after successful auth
    } catch (error) {
      // Handle authentication errors
      const errorMessages = {
        "auth/invalid-email": "Invalid email format.",
        "auth/user-disabled": "User account is disabled.",
        "auth/user-not-found": "No user found with this email.",
        "auth/wrong-password": "Incorrect password.",
        "auth/invalid-credential": "Invalid credentials provided.",
      };
      setError(errorMessages[error.code] || error.message);
    } finally {
      // Reset loading state
      if (isSignUp) {
        setLoadingSignUp(false);
      } else {
        setLoadingSignIn(false);
      }
    }
  };

  return (
    <section className={classes.auth}>
      {/* Amazon logo */}
      <Link to="/">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
          alt="Amazon Logo"
          className={classes.logo}
        />
      </Link>
      <div className={classes.formContainer}>
        <h1>Sign-In</h1>
        {navStateData?.state?.msg && (
          <small
            style={{
              padding: "5px",
              textAlign: "center",
              color: "red",
              fontWeight: "bold",
            }}
          >
            {navStateData?.state?.msg}
          </small>
        )}
        <form>
          {/* Email input */}
          <div className={classes.formGroup}>
            <label htmlFor="email">Email or mobile phone number</label>
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {/* Password input */}
          <div className={classes.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {/* Remember me checkbox */}
          <div className={classes.rememberMe}>
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="rememberMe">Remember me</label>
          </div>
          {/* Sign-in button */}
          <button
            onClick={(e) => handleAuth(e, false)}
            type="submit"
            className={classes.signInButton}
            disabled={loadingSignIn}
          >
            {loadingSignIn ? (
              <span className={classes.spinner}></span>
            ) : (
              "Sign-In"
            )}
          </button>
        </form>
        {/* Error message display */}
        {error && <p className={classes.error}>{error}</p>}
        {/* Terms and conditions */}
        <p>
          By continuing, you agree to Amazon's Conditions of Use and Privacy
          Notice.
        </p>
        {/* Forgot password link */}
        <Link to="/forgot-password" className={classes.forgotPassword}>
          Forgot Password?
        </Link>
        {/* Sign-up button */}
        <button
          className={classes.createAccountButton}
          onClick={(e) => handleAuth(e, true)}
          disabled={loadingSignUp}
        >
          {loadingSignUp ? (
            <span className={classes.spinner}></span>
          ) : (
            "Create your Amazon account"
          )}
        </button>
      </div>
    </section>
  );
};

export default Auth;
