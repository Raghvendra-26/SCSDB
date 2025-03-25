import axios from "../../utils/axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import noimage from "/noimage.jpg";

const Topnav = () => {
  const [query, setQuery] = useState("");
  const [searches, setSearches] = useState([]);

  const GetSearches = async () => {
    try {
      const { data } = await axios.get(`search/multi?query=${query}`);
      setSearches(data.results);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    GetSearches();
  }, [query]);

  return (
    <div className="w-full h-[10vh] flex justify-center items-center">
      <div className="w-[62%] flex items-center justify-start">
        <i className="text-3xl text-zinc-400 ri-search-line"></i>
        <input
          type="text"
          placeholder="search here"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          className="text-zinc-200 w-[80%] px-5 py-3 mx-10 rounded text-xl bg-transparent"
        />
        {query.length > 0 && (
          <i
            onClick={() => setQuery("")}
            className="text-3xl text-zinc-400 ri-close-line"
          ></i>
        )}
      </div>

      <div className="absolute w-[40%] rounded max-h-[50vh] bg-zinc-200 top-[10%] left-[39.75%] overflow-auto">
        {searches.map((s, i) => (
          <Link
            key={i}
            className="font-semibold text-zinc-600 w-[100%] px-10 py-5 flex justify-start items-center border-b-2 border-zinc-100 hover:bg-zinc-300 hover:text-black duration-300"
          >
            <img
              className="w-[10vh] h-[10vh] object-cover rounded mr-5"
              src={
                s.backdrop_path || s.profile_path
                  ? `https://image.tmdb.org/t/p/original/${
                      s.backdrop_path || s.profile_path
                    }`
                  : noimage
              }
              alt=""
            />
            <span>{s.name || s.original_name || s.original_title || s.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Topnav;
