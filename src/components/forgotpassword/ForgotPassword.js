import React, { useState } from "react";
import "./ForgotPassword.css";
import { Link, useNavigate } from "react-router-dom";
import CustomInput from "../../customcomponents/custominput/CustomInput";
import { auth } from "../../firebase";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  async function handleResetPassword(e) {
    e.preventDefault();

    try {
      await auth.sendPasswordResetEmail(email);
      setEmail("");
      navigate("/login");
    } catch (error) {
      var errormsg = error.message.replace(/ \([^)]*\)\./, "");
      toast.warn(errormsg);
      // alert(error.message.replace(/ \([^)]*\)\./, ""));
      console.log(error.message);
    }
  }

  return (
    <div className="forgotpassword">
      <div className="forgotpassword-container">
        <div className="forgotpassword-heading">
          <h3>Reset Password</h3>
        </div>
        <form className="email-section" onSubmit={handleResetPassword}>
          <label>Email:</label>
          {/* <input type="email" placeholder="Enter Email Address" required /> */}
          <CustomInput
            onChange={handleEmail}
            value={email}
            type="email"
            placeholder="Enter Email Address"
            required={true}
          />
          <button className="custom-primary-btn ">RESET</button>
        </form>
        <div className="navigate-section">
          <Link style={{ textDecoration: "none" }} to="/login">
            <label>Login</label>
          </Link>
          <Link style={{ textDecoration: "none" }} to="/signup">
            <label>Signup</label>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
