import React from "react";
import "./ContactUs.css";
import emailjs from "emailjs-com";
// import CustomInput from "../../customcomponents/custominput/CustomInput";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

function ContactUs() {
  console.log("Raveena");
  function sendEmail(e) {
    console.log(e.target.value);
    e.preventDefault();
    emailjs
      .sendForm(
        "service_ne2mhop",
        "template_pdaodet",
        e.target,
        "PccIPV6FKCPoGc958"
      )
      .then(
        (result) => {
          toast.success("Email Sent Successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
          });
        },
        (error) => {
          toast.warn("Somthing went wrong", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      );
    e.target.reset();
  }

  return (
    <div className="contactus">
      <div className="contactus-container">
        <div className="contactus-title-container">
          <h3>Contact Us</h3>
        </div>

        <form className="contactus-section " onSubmit={sendEmail}>
          <label>Name:</label>
          <div className="custom-input-container">
            <input
              className=".custom-input"
              type="text"
              placeholder="Enter Name"
              required
              name="name"
            ></input>
          </div>

          {/* <label>Name:</label>
          <CustomInput
            type="text"
            placeholder="Enter Name"
            required={true}
            name="name"
            onChange={sendEmail}
          /> */}

          <label>Email:</label>
          <div className="custom-input-container">
            <input
              className=".custom-input"
              type="email"
              name="email"
              placeholder="Enter Email Address"
              required
            ></input>
          </div>

          {/* <CustomInput
            type="email"
            placeholder="Enter Email Address"
            required={true}
            name="email"
            onChange={sendEmail}
          /> */}

          <textarea
            rows={5}
            placeholder="Enter your message here...."
            name="message"
          ></textarea>

          <button className="custom-primary-btn">SUBMIT</button>
        </form>
      </div>
    </div>
  );
}

export default ContactUs;
