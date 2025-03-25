import React from "react";
import { Link } from "react-router-dom";

const HorizontalCards = ({ data }) => {
  return (
      
      <div className="flex h-[50vh] overflow-x-auto px-5 py-2 mb-5">
        {data.map((d, i) => (
          <div key={i} className="min-w-[20%] bg-zinc-900 rounded-lg overflow-hidden mr-5 mb-5">
            <img
              className="w-full h-[45%] object-cover"
              src={`https://image.tmdb.org/t/p/original/${
                d.backdrop_path || d.profile_path
              }`}
              alt=""
            />
            <div className="text-white p-2">
              <h1 className="text-xl font-semibold">
                {d.name || d.original_name || d.original_title || d.title}
              </h1>
              <p className="mt-2">
                {d.overview.slice(0, 90)}...{" "}
                <Link className="text-zinc-500">more</Link>
              </p>
            </div>
          </div>
        ))}
      </div>
  );
};

export default HorizontalCards;
