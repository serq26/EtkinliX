import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

export default function Header() {
  return (
    <div className="header">
      <div className="container">
        <div className="row">
          <div className="col-xl-1">
            <Link  to="/">
              <div className="logo">etkinliX</div>
            </Link>
          </div>
          <div className="col-xl-8">
            <ul>
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
          <SearchBar />
        </div>
      </div>
    </div>
  );
}
