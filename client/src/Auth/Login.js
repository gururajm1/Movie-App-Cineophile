import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function Login(props) {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  async function handdleSubmit(e) {
    e.preventDefault();
    const { email, password } = data;
    try {
      const { data } = await axios.post("http://localhost:8000/", {
        email,
        password,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        toast.success("Login Successful");
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handdleSignUp() {
    navigate("/signup");
  }

  return (
    <div>
      <form className="container">
        <h1 className="heading">LOGIN</h1>
        <input
          type="email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          placeholder="Email"
        />
        <input
          type="password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          placeholder="Password"
        />
        <button className="btn" onClick={handdleSubmit}>
          Login
        </button>
        <h6>Dont have an account ?</h6>
        <button className="btn_ls" onClick={handdleSignUp}>
          SignUp
        </button>
      </form>
    </div>
  );
}
