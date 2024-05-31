import React, { useState, useRef, useEffect } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import PasswordChecklist from "react-password-checklist";
import pakka from "../assets/pakka.jpg";
import { firebaseAuth } from "../dependencies/firebaseConfig";

function Signup() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("cini-auth")) {
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

  const signUpForm = async (e) => {
    e.preventDefault();
    setError("");
    const email = emailInputRef.current.value;
    const name = userName.current.value;
    const age = userAge.current.value;
    const password = passwordInputRef;
    try{
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
      if (!localStorage.getItem("cini-auth", "true")) {
        localStorage.setItem("cini-auth", "true");
      }
    }catch(err){
      console.log(err);
    }
  };

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if(currentUser) navigate("/dash");
  })

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
        <div className="p-6 md:p-7 md:pt-5 flex flex-col justify-center">
          <form onSubmit={signUpForm}>
            <h2 className="text-4xl font-bold text-center mb-9 text-gray-600">
              Signup
            </h2>
            <div className="space-y-4">
              <input
                className="border p-2 w-full text-black"
                type="text"
                placeholder="Enter Your Name"
                ref={userName}
              />
              <input
                className="border p-2 w-full text-black"
                type="text"
                placeholder="Enter Your Age"
                ref={userAge}
              />
              <input
                className="border p-2 w-full text-black"
                type="text"
                placeholder="Your Email Address"
                ref={emailInputRef}
              />
              <input
                className="border p-2 w-full text-black"
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
                  className="text-black"
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
