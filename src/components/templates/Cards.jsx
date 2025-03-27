import React from "react";
import { Link } from "react-router-dom";
import noimage from "/noimage.jpg";

const Cards = ({ data, title }) => {
  return (
    <div className="w-full px-[3%] flex flex-wrap justify-evenly gap-y-5 mt-5 bg-[#1f1e24]">
      {data.map((c, i) => (
        <Link
          to={`/${c.media_type || title}/details/${c.id}`}
          className="relative w-[33vh] mb-5"
          key={i}
        >
          <img
            className="object-cover shadow-[8px_17px_18px_2px_rgba(0,0,0,0.5)]"
            src={
              c.poster_path || c.backdrop_path || c.profile_path
                ? `https://image.tmdb.org/t/p/original/${
                    c.poster_path || c.backdrop_path || c.profile_path
                  }`
                : noimage
            }
            alt=""
          />
          <h1 className="text-xl font-semibold text-zinc-300 mt-3">
            {c.name || c.title || c.original_name || c.original_title}
          </h1>

          {c.vote_average && (
            <div className="absolute right-[-10%] bottom-[30%] text-xl font-semibold h-[7vh] w-[7vh] rounded-full bg-yellow-600 text-white flex justify-center items-center">
              {(c.vote_average * 10).toFixed()}%
            </div>
          )}
        </Link>
      ))}
    </div>
  );
};

export default Cards;
