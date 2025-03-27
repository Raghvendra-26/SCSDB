import React from "react";
import { Link } from "react-router-dom";

const HorizontalCards = ({ data }) => {
  return (
    <div className="flex h-fit overflow-x-auto px-5 py-2 mb-5">
      {data.length > 0 ? (
        data.map((d, i) => (
          <Link
            to={`/${d.media_type}/details/${d.id}`}
            key={i}
            className="min-w-[20%] bg-zinc-900 rounded-lg mr-5 mb-5 overflow-hidden"
          >
            <img
              className="w-full h-[50%] object-cover"
              src={`https://image.tmdb.org/t/p/original/${
                d.backdrop_path || d.profile_path
              }`}
              alt=""
            />
            <div className="text-white p-2 ">
              <h1 className="text-xl font-semibold">
                {d.name || d.original_name || d.original_title || d.title}
              </h1>
              <p className="mt-2">
                {d.overview.slice(0, 90)}...{" "}
                <span className="text-zinc-500">more</span>
              </p>
            </div>
          </Link>
        ))
      ) : (
        <h1 className="text-3xl text-white font-black text-center">No Data</h1>
      )}
    </div>
  );
};

export default HorizontalCards;
