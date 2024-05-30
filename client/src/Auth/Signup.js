import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PasswordChecklist from "react-password-checklist";
import pakka from "../assets/pakka.jpg";

function Signup() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("auth")) {
      navigate("/dash");
    }
  }, []);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [passwordInputRef, setpasswordInputRef] = useState("");
  const emailInputRef = useRef(null);
  const userName = useRef(null);
  const userAge = useRef(null);

  const handlePasswordChange = (e) => {
    setpasswordInputRef(e.target.value);
  };

  const signUpForm = (e) => {
    e.preventDefault();
    setError("");
    const email = emailInputRef.current.value;
    const name = userName.current.value;
    const age = userAge.current.value;
    const password = passwordInputRef;
    const regEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email === null || (email === "" && name !== null)) {
      setMessage("Please enter your email");
    } else if (email !== "" && !regEx.test(email)) {
      setMessage("Enter a Valid Email");
    } else {
      setMessage("");
    }
    if (password === "" && name === null && age === null) {
      setPassword("");
    } else if (password === "") {
      setPassword("Please Check your Credentials");
    } else {
      setPassword("");
    }

    if (email !== null && password !== "") {
      //pending...
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative md:h-[550px]">
          <img
            className="object-cover w-full h-full"
            src={pakka}
            alt="Signup background"
          />
        </div>
        <div className="p-6 md:p-10 flex flex-col justify-center">
          <form onSubmit={signUpForm}>
            <h2 className="text-4xl font-bold text-center mb-9 text-gray-600">
              Signup
            </h2>
            <div className="space-y-4">
              <input
                className="border p-2 w-full"
                type="text"
                placeholder="Enter Your Name"
                ref={userName}
              />
              <input
                className="border p-2 w-full"
                type="text"
                placeholder="Enter Your Age"
                ref={userAge}
              />
              <input
                className="border p-2 w-full"
                type="text"
                placeholder="Your Email Address"
                ref={emailInputRef}
              />
              <h5 className="text-red-600">{message}</h5>
              <input
                className="border p-2 w-full"
                type="password"
                placeholder="Enter Password"
                value={passwordInputRef}
                onChange={handlePasswordChange}
              />
              {passwordInputRef !== "" ? (
                <PasswordChecklist
                  value={passwordInputRef}
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
              <h5 className="text-red-600">{password}</h5>
            </div>
            <button className="w-full bg-green-600 hover:bg-yellow-500 text-white font-bold py-2 px-4 mt-4 rounded">
              Sign Up
            </button>
            <h5 className="text-red-600 text-center">{error}</h5>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
