import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import pakka from "../assets/pakka.jpg";
import { firebaseAuth } from "../dependencies/firebaseConfig";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import PasswordChecklist from "react-password-checklist";

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("cini-auth")) {
      navigate("/dash");
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        navigate("/dash");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const [error, setError] = useState("");
  const [passwordInputRef, setPasswordInputRef] = useState("");
  const emailInputRef = useRef();

  const handlePasswordChange = (e) => {
    setPasswordInputRef(e.target.value);
  };

  const logInForm = async (e) => {
    e.preventDefault();
    const email = emailInputRef.current.value;
    const password = passwordInputRef;
    setError("");
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
      localStorage.setItem("cini-auth", "true");
      navigate("/dash");
    } catch (err) {
      setError(err.message);
      console.error("Login error: ", err);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="w-full h-[550px] hidden md:block">
          <img
            className="w-full h-full object-cover"
            src={pakka}
            alt="Login background"
          />
        </div>
        <div className="p-4 flex flex-col justify-around">
          <form onSubmit={logInForm}>
            <h2 className="text-4xl font-bold text-center mb-9 text-gray-600">
              Login
            </h2>
            <div className="ml-8">
              <input
                className="border p-2 mr-2 mb-4 w-80 ml-2 text-black"
                type="text"
                placeholder="Your Email Address"
                ref={emailInputRef}
              />
              <input
                className="border p-2 mb-4 w-80 ml-2 text-black"
                type="password"
                placeholder="Enter Password"
                value={passwordInputRef}
                onChange={handlePasswordChange}
              />
              {passwordInputRef !== "" ? (
                <PasswordChecklist
                  value={passwordInputRef}
                  className="text-black"
                  rules={[
                    "minLength",
                    "lowercase",
                    "specialChar",
                    "number",
                    "capital",
                  ]}
                  minLength={8}
                />
              ) : (
                ""
              )}
            </div>
            <button
              className="w-[350px] ml-6 p-2 my-4 bg-green-600 hover:bg-yellow-500 mt-7"
              type="submit"
            >
              Log In
            </button>
            <h5 className="text-red-600 flex justify-center">{error}</h5>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
