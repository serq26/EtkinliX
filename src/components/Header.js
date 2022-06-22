import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import SearchBar from "./SearchBar";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [mobileMenuShow, setMobileMenuShow] = useState(false);

  const handleChange = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="header">
      <div
        className="mobile-menuTab"
        onClick={() => {
          if (!mobileMenuShow) {
            document.getElementById("menu").style.left = "0%";
            setMobileMenuShow(true);
          } else {
            document.getElementById("menu").style.left = "-100%";
            setMobileMenuShow(false);
          }
        }}
      >
        <img
          src={mobileMenuShow ? "/icons/close.png" : "/icons/menu.png"}
          alt="menu"
        />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-xl-1 col-lg-2">
            <Link to="/">
              <div className="logo">etkinli<b style={{color:"coral",fontWeight:900,fontSize:"36px",padding:"0 2px"}}>X</b></div>
            </Link>
          </div>
          <div className="col-xl-7 col-lg-5">
            <ul id="menu">
              <li>
                <Link to="/" title="Ansayfa">
                  Anasayfa
                </Link>
              </li>
              <li>
                <Link to="/old-events" title="Geçmiş Etkinlikler">
                  Geçmiş Etkinlikler
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-xl-1 col-lg-2">
            <div className="app-actions">
              <div className="theme-wrapper">
                <div className="theme-switch-wrapper">
                  <label htmlFor="theme-btn">
                    <input
                      type="checkbox"
                      id="theme-btn"
                      onChange={handleChange}
                      value={theme}
                      checked={theme === "dark" ? "checked" : ""}
                    />
                    <div className="slider-wrapper">
                      <div className="theme-btn-slider">
                        <img
                          src={
                            theme === "dark"
                              ? "/icons/moon.png"
                              : "/icons/sun.png"
                          }
                          alt=""
                        />
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <SearchBar />
        </div>
      </div>
    </div>
  );
}
