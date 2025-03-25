import React from "react";
import { Link } from "react-router-dom";

const Sidenav = () => {
  return (
    <div className="w-[20%] h-full border-r-2 border-zinc-400 px-10 py-5">
      <h1 className="text-3xl text-white font-semibold">
        <i className="ri-tv-fill text-[#6556cd] mr-3"></i>
        <span>SCSDB.</span>
      </h1>

      <nav className="flex flex-col text-xl gap-3 text-zinc-400">
        <h1 className="text-xl text-white font-semibold mt-8 mb-3">New Feed</h1>
        <Link
          to="/trending"
          className="hover:bg-[#6556cd] hover:text-white duration-300 rounded-lg px-5 py-2"
        >
          <i className="mr-2 ri-fire-fill"></i>
          Trending
        </Link>
        <Link
          to="/popular"
          className="hover:bg-[#6556cd] hover:text-white duration-300 rounded-lg px-5 py-2"
        >
          <i className="ri-bard-fill mr-2"></i>
          Popular
        </Link>
        <Link
          to="/movies"
          className="hover:bg-[#6556cd] hover:text-white duration-300 rounded-lg px-5 py-2"
        >
          <i className="ri-movie-2-fill mr-2"></i>
          Movies
        </Link>
        <Link
          to="tvshows"
          className="hover:bg-[#6556cd] hover:text-white duration-300 rounded-lg px-5 py-2"
        >
          <i className="ri-tv-2-fill mr-2"></i>
          Tv Shows
        </Link>
        <Link className="hover:bg-[#6556cd] hover:text-white duration-300 rounded-lg px-5 py-2">
          <i className="ri-team-fill mr-2"></i>
          People
        </Link>
      </nav>

      <hr className="border-none h-[1px] bg-zinc-400 my-5" />

      <nav className="flex flex-col text-xl gap-3 text-zinc-400">
        <h1 className="text-xl text-white font-semibold my-2">
          Website information
        </h1>
        <Link className="hover:bg-[#6556cd] hover:text-white duration-300 rounded-lg px-5 py-2">
          <i className="mr-2 ri-information-2-fill"></i>
          About
        </Link>
        <Link className="hover:bg-[#6556cd] hover:text-white duration-300 rounded-lg px-5 py-2">
          <i className=" mr-2 ri-phone-fill"></i>
          Contact
        </Link>
      </nav>
    </div>
  );
};

export default Sidenav;
