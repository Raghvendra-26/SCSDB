import React from "react";
import { Link } from "react-router-dom";

const Header = ({ data }) => {
  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.4),rgba(0,0,0,0.7)),url(https://image.tmdb.org/t/p/original/${
          data.backdrop_path || data.profile_path
        })`,
        backgroundPosition: "top",
        backgroundSize: "cover",
      }}
      className="w-full h-[60vh] flex flex-col justify-end items-start px-[5%] py-[3%]"
    >
      <h1 className="w-[50%] text-white text-5xl font-black">
        {data.name || data.original_name || data.original_title || data.title}
      </h1>
      <p className="mt-3 w-[60%] text-white">
        {data.overview.slice(0, 200)}...{" "}
        <Link
          to={`/${data.media_type}/details/${data.id}`}
          className="text-blue-400"
        >
          more
        </Link>
      </p>
      <p className="text-white mt-3">
        <i className="text-yellow-500 ri-megaphone-fill mr-1"></i>
        {data.release_date || "No Information"}
        <i className="text-yellow-500 ri-album-fill ml-5 mr-1"></i>
        {data.media_type.toUpperCase()}
      </p>
      <Link
        to={`/${data.media_type}/details/${data.id}/trailer`}
        className="bg-[#6556cd] px-5 py-3 text-white rounded-lg mt-5 "
      >
        Watch Trailer
      </Link>
    </div>
  );
};

export default Header;
