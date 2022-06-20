import React, { useEffect, useRef, useState } from "react";
import { fetchEventBySearch } from "../api";
import ContentLoader from "react-content-loader";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef();

  const AutocompleteLoader = () => (
    <ContentLoader
      speed={2}
      width={500}
      height={60}
      viewBox="0 0 500 60"
      backgroundColor="#f3f3f3"
      foregroundColor="#dedede"
    >
      <rect x="203" y="22" rx="0" ry="0" width="4" height="3" />
      <rect x="15" y="10" rx="0" ry="0" width="71" height="40" />
      <rect x="96" y="20" rx="0" ry="0" width="169" height="8" />
      <rect x="96" y="35" rx="0" ry="0" width="92" height="6" />
    </ContentLoader>
  );

  const isTyping = search.replace(/\s+/, "").length > 0;

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (e) => {
    if (searchRef.current && !searchRef.current.contains(e.target)) {
      setSearch("");
    }
  };

  const getResultItem = (item) => {
    window.location.href = "/event/"+item.id;
  };

  useEffect(() => {
    if (isTyping) {
      setLoading(true);
      const getData = setTimeout(async () => {
        const data = await fetchEventBySearch(search.toLocaleLowerCase());
        setResult(data.length > 0 ? data : false);
        setLoading(false);
      }, 500);

      return () => {
        clearTimeout(getData);
        setLoading(false);
      };
    } else {
      setResult(false);
    }
  }, [search]);

  return (
    <div className="col-3">
      <div className="search" ref={searchRef}>
        <input
          type="text"
          value={search}
          className={isTyping ? "typing" : null}
          placeholder="Etkinlik, Sanatçı yada Mekan Arayın"
          onChange={(e) => setSearch(e.target.value)}
        />
        {isTyping && (
          <div className="search-result">
            {result &&
              loading === false &&
              result.map((event) => (
                <div
                  onClick={() => getResultItem(event)}
                  key={event.id}
                  className="search-result-item"
                >
                  <img src={event.images[0].src} alt={event.title} />
                  <div>
                    <div className="title">{event.title}</div>
                    <div className="date">{event.owner}</div>
                  </div>
                </div>
              ))}
            {loading && new Array(3).fill().map(() => <AutocompleteLoader />)}
            {!result && loading === false && (
              <div className="result-not-found">
                "{search}" ile ilgili bir sonuç bulunamadı!
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
