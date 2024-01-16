import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./SignUp.css";
import { GoEye } from "react-icons/go";
import { GoEyeClosed } from "react-icons/go";
import { auth } from "../../firebase";
import CustomInput from "../../customcomponents/custominput/CustomInput";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  function handleName(e) {
    setName(e.target.value);
  }

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  async function handleSignup(e) {
    e.preventDefault();
    console.log("handle signup");

    try {
      await auth.createUserWithEmailAndPassword(email, password);
      setEmail("");
      setName("");
      setPassword("");
      if (location.state && location.state.referrer) {
        if (location.state.referrer === "checkout") {
          navigate("/checkout");
          return null;
        }
        return null;
      } else navigate("/shop");
    } catch (error) {
      let e = error.message.replace(/ \([^)]*\)\./, "");
      toast.error(e);

      // if (error.message.includes("auth/email-already-in-use")) {
      //   alert("email-already-in-use");
      // } else if (error.message.includes("auth/weak-password")) {
      //   alert("weak-password");
      // } else alert("fail to create an account");
    }
  }

  return (
    <div className="signup">
      <div className="signup-container">
        <div className="signup-heading">
          <h3>Sign Up</h3>
        </div>

        <form onSubmit={handleSignup} className="signup-section">
          <label>Name:</label>
          <CustomInput
            onChange={handleName}
            type="text"
            value={name}
            placeholder="Enter Name"
            required
          />

          <label>Email:</label>
          <CustomInput
            onChange={handleEmail}
            type="email"
            value={email}
            placeholder="Enter Email Address"
            required
          />

          <label>Password:</label>

          <div className="password-section">
            <CustomInput
              onChange={handlePassword}
              value={password}
              type={showPassword ? "text" : "password"}
              placeholder="Enter your Password"
              required
            />
            <span onClick={() => setShowPassword(!showPassword)}>
              {!showPassword ? <GoEyeClosed /> : <GoEye />}
            </span>
          </div>

          <button className="custom-primary-btn">Register</button>
        </form>
        <div className="navigate-section">
          <Link style={{ textDecoration: "none" }} to="/login">
            <label className="navigate-label">
              Already have an account? &nbsp;
              <span className="navigate-span">Login Here</span>
            </label>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
