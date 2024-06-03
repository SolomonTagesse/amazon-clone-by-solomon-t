import React, { useState, useContext } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../Utility/firebase";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { ClipLoader } from "react-spinners";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import "./Auth.css";
import { Type } from "../../Utility/action.type";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [loading, setLoading] = useState({
    signIn: false,
    signUp: false,
  });

  const [{ user }, dispatch] = useContext(DataContext);
  console.log(user);
  const navigate = useNavigate();
  const navStateData = useLocation();
  const ClickHandler = async (e) => {
    e.preventDefault();
    if (e.target.name === "signIn") {
      setLoading({ ...loading, signIn: true });
      navigate(navStateData?.state?.redirect || "/");
      await signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...loading, signIn: false });
          console.log(userInfo.user);
          navigate("/");
        })
        .catch((err) => {
          setError(err.message);
          setLoading({ ...loading, signIn: false });
        });
    } else {
      setLoading({ ...loading, signUp: true });
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...loading, signUp: false });
          navigate(navStateData?.state?.redirect || "/");
        })
        .catch((err) => {
          setError(err.message);
        });
      setLoading({ ...loading, signUp: false });
    }
  };
  return (
    <section className="login">
      <Link to="/">
        <img
          src="https://purepng.com/public/uploads/large/amazon-logo-s3f.png"
          alt="Amazon Logo"
        />
      </Link>
      <div className="login_container">
        <h1>Sign In</h1>
        {navStateData?.state?.msg && (
          <small
            style={{
              padding: "5px",
              textAlign: "center",
              color: "red",
              fontWeight: "bold",
            }}
          >
            {navStateData.state.msg}
          </small>
        )}
        <form action="">
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
            />
          </div>
          {loading.signIn ? (
            <ClipLoader
              className="Clip_Loader"
              color="#d63649"
              size={30}
            ></ClipLoader>
          ) : (
            <button
              onClick={(e) => ClickHandler(e)}
              name="signIn"
              type="submit"
              className="login_signInButton"
            >
              Sign In
            </button>
          )}
        </form>
        <p>
          By signing in you agree to the AMAZON FAKE DEVELOPED by Solomon T.
          Please see our Privacy notice, our cookies notice and our interest
          bsed ads notice
        </p>

        {loading.signUp ? (
          <div className="Clip_Loader">
            <ClipLoader color="#d63649" size={30} />
          </div>
        ) : (
          <button
            onClick={(e) => ClickHandler(e)}
            name="signUp"
            type="submit"
            className="registerButton"
          >
            Create Your Amazon Account
          </button>
        )}
        {error && (
          <small style={{ paddingTop: "5px", color: "red" }}>{error}</small>
        )}
      </div>
    </section>
  );
};

export default Auth;
