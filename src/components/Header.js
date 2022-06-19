import React from "react";
import SearchBar from "./SearchBar";

export default function Header() {
  return (
    <div className="header">
      <div className="container">
        <div className="row">
          <div className="col-1 logo">etkinliX</div>
          <div className="col-8">
            <ul>
              <li>
                <a href="/#" title="">
                  Anasayfa
                </a>
              </li>
              <li>
                <a href="/#" title="Geçmiş Etkinlikler">
                  Geçmiş Etkinlikler
                </a>
              </li>
              <li>
                <a href="/#" title="">
                  İletişim
                </a>
              </li>
            </ul>
          </div>
          <SearchBar />
        </div>
      </div>
    </div>
  );
}
