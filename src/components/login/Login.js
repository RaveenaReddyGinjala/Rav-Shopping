import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Login.css";

import CustomInput from "../../customcomponents/custominput/CustomInput";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  function handleRegister() {
    if (location.state && location.state.referrer) {
      if (location.state.referrer === "checkout") {
        navigate("/signup", { state: { referrer: "checkout" } });
      }
    } else navigate("/signup");
  }

  async function handleLogin(e) {
    e.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(email, password);
      setEmail("");
      setPassword("");
      if (location.state && location.state.referrer) {
        if (location.state.referrer === "checkout") {
          navigate("/checkout");
        }
      } else navigate("/shop");
    } catch (error) {
      let e = error.message.replace(/ \([^)]*\)\./, "");
      toast.error(e);
    }
  }
  return (
    <div className="login">
      <div className="login-container">
        <div className="login-heading">
          <h3>Log In</h3>
        </div>

        <form className="login-section" onSubmit={handleLogin}>
          <label>Email:</label>

          <CustomInput
            onChange={handleEmail}
            type="email"
            value={email}
            placeholder="Enter Email Address"
            required
          />

          <label>Password:</label>
          <CustomInput
            onChange={handlePassword}
            type="password"
            value={password}
            placeholder="Enter your Password"
            required
          />

          {/* <CustomButton type="primary" label="LOGIN" /> */}

          <button className="custom-primary-btn">LOGIN</button>
        </form>

        <div className="login-signup-section">
          <Link style={{ textDecoration: "none" }} to="/forgotpassword">
            <label>Forgot Password</label>
          </Link>

          {/* <span>
            New User? &nbsp;
            <Link style={{ textDecoration: "none" }} to="/signup">
              <label>Register Here</label>
            </Link>
          </span> */}
          <div>
            <span>New User ? &nbsp;</span>
            <span
              onClick={handleRegister}
              className="login-signup-section-login"
            >
              Register Here
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
