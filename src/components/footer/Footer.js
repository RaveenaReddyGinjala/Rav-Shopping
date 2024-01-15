import React from "react";
import "./Footer.css";
import { BsLinkedin } from "react-icons/bs";
import { IoLogoGithub } from "react-icons/io";

import {
  AiFillGithub,
  AiOutlineTwitter,
  AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

function Footer() {
  let date = new Date();
  let year = date.getFullYear();
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="footer-logo"> Rav Shopping</div>
        <div className="copy-right">Copyright © {year}</div>
        <div className="social-media">
          <div className="social-media-container">
            <div className="social-media-icon">
              <a
                href="https://www.linkedin.com/in/raveenaginjala-usf/"
                target="_blank"
              >
                <FaLinkedinIn fontSize={24} color="whitesmoke" />
              </a>
            </div>
            <div className="social-media-icon">
              <a href="https://github.com/RaveenaReddyGinjala" target="_blank">
                <AiFillGithub fontSize={24} color="whitesmoke" />
              </a>
            </div>
            <div className="social-media-icon">
              <a href="https://twitter.com/" target="_blank">
                <AiOutlineTwitter fontSize={26} color="whitesmoke" />
              </a>
            </div>
            <div className="social-media-icon">
              <a href="https://www.instagram.com/" target="_blank">
                <AiFillInstagram fontSize={26} color="whitesmoke" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
