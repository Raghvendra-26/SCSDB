import React from "react";
import { Link } from "react-router-dom";
import noimage from "/noimage.jpg";

const Cards = ({ data, title }) => {
  return (
    <div className="w-full px-[3%] flex flex-wrap justify-evenly gap-y-5 mt-5 bg-[#1f1e24]">
      {data.map((c, i) => (
        <Link className="w-[33vh] mb-5" key={i}>
          <img
            className="object-cover shadow-[8px_17px_18px_2px_rgba(0,0,0,0.5)]"
            src={
              c.poster_path || c.backdrop_path
                ? `https://image.tmdb.org/t/p/original/${
                    c.poster_path || c.backdrop_path
                  }`
                : noimage
            }
            alt=""
          />
          <h1 className="text-xl font-semibold text-zinc-300 mt-3">
            {c.name || c.title || c.original_name || c.original_title}
          </h1>
        </Link>
      ))}
    </div>
  );
};

export default Cards;
