import React, { useState } from "react";
import "./Addresspage.css";
import CustomInput from "../../customcomponents/custominput/CustomInput";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCurrentAddress } from "../../redux/Action";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

function Addresspage() {
  // create an object for address
  const dispatch = useDispatch();

  const [address, setAddress] = useState({
    name: "",
    mobile: "",
    address: "",
    state: "",
    zipcode: "",
  });

  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    if (address.mobile.length < 10) {
      toast.warn("invalid mobile number");
    } else if (address.zipcode.length < 5) {
      toast.warn("invalid zipcode");
    } else {
      dispatch(addCurrentAddress(address));
      navigate("/paymentpage");
    }
  }

  function handleChange(e) {
    if (e.target.name === "mobile") {
      const mobilenumber = e.target.value.replace(/\D/g, "").slice(0, 10);
      setAddress((prev) => ({ ...prev, mobile: mobilenumber }));
    } else if (e.target.name === "zipcode") {
      const zipcode = e.target.value.replace(/\D/g, "").slice(0, 6);
      setAddress((prev) => ({ ...prev, zipcode: zipcode }));
    } else setAddress((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  return (
    <div className="address-page">
      <div className="address-page-container">
        <div className="address-page-heading">
          <h3>Address Page</h3>
        </div>

        <form className="address-page-details" onSubmit={handleSubmit}>
          <label>Name:</label>
          <CustomInput
            name="name"
            type="text"
            placeholder="Enter Name..."
            required
            value={address.name}
            onChange={handleChange}
          />
          <label>Mobile:</label>
          <CustomInput
            type="text"
            placeholder="Enter Phone Number "
            name="mobile"
            value={address.mobile}
            required
            onChange={handleChange}
          />
          <label>Address:</label>
          <CustomInput
            onChange={handleChange}
            type="text"
            value={address.address}
            name="address"
            placeholder="Enter Address..."
            required
          />
          <div className="address-page-state-zipcode">
            <div className="address-page-state">
              <label>State:</label>
              <CustomInput
                onChange={handleChange}
                type="text"
                placeholder="state"
                value={address.state}
                name="state"
                required
              />
            </div>
            <div className="address-page-zipcode">
              <label>Zipcode:</label>
              <CustomInput
                onChange={handleChange}
                type="text"
                placeholder="zipcode"
                value={address.zipcode}
                required
                name="zipcode"
              />
            </div>
          </div>

          <div className="address-page-btn">
            <button className="custom-primary-btn">ADD ADDRESS</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Addresspage;
