import React from "react";

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
                <a href="/#" title="">
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
          <div className="col-3 searchBar">
            <input
              type="search"
              id="search"
              name="search"
              placeholder="Etkinlik, Sanatçı yada Mekann Arayın"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
