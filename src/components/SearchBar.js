import React from "react";

export default function SearchBar() {
  return (
    <div className="col-3 searchBar">
      <input
        type="search"
        id="search"
        name="search"
        placeholder="Etkinlik, Sanatçı yada Mekann Arayın"
      />
    </div>
  );
}
