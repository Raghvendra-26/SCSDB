import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { asyncloudmovie, removemovie } from "../store/actions/movieActions";
import Loading from "../components/Loading";
import HorizontalCards from "./templates/HorizontalCards";

const MovieDetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.movie);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncloudmovie(id));
    return () => {
      dispatch(removemovie());
    };
  }, [id]);

  console.log(info);

  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.4),rgba(0,0,0,0.7)),url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
        backgroundPosition: "top",
        backgroundSize: "cover",
      }}
      className="w-screen h-fit px-[7%] relative"
    >
      {/* part 1 navigation */}
      <nav className="w-full h-[10vh] text-xl text-zinc-100 flex items-center gap-10">
        <Link
          onClick={() => navigate(-1)}
          className="ri-arrow-left-line hover:text-[#6556cd] mr-3"
        ></Link>
        <a target="_blank" href={info.detail.homepage}>
          <i className="ri-external-link-line hover:text-[#6556cd]"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
        >
          <i className="ri-global-line hover:text-[#6556cd]"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.imdb.com/title/${info.externalid.imdb_id}`}
          className="hover:text-[#6556cd]"
        >
          imdb
        </a>
      </nav>

      {/* part 2 poster and details */}
      <div className="w-full flex mt-5">
        <img
          className="object-cover shadow-[8px_17px_18px_2px_rgba(0,0,0,0.5)] h-[55vh]"
          src={`https://image.tmdb.org/t/p/original/${
            info.detail.poster_path || info.detail.backdrop_path
          }`}
          alt=""
        />

        <div className="content ml-[5%] text-white">
          <h1 className="text-5xl font-black">
            {info.detail.name ||
              info.detail.title ||
              info.detail.original_name ||
              info.detail.original_title}

            <span className="text-2xl font-bold text-zinc-200 ml-2">
              ({info.detail.release_date.split("-")[0]})
            </span>
          </h1>

          <div className="flex items-center gap-x-5 mt-3">
            <span className="text-xl font-semibold h-[8vh] w-[8vh] rounded-full bg-yellow-600  flex justify-center items-center">
              {(info.detail.vote_average * 10).toFixed()}%
            </span>
            <h1 className="font-semibold text-2xl w-[60px] leading-5">
              User Score
            </h1>
            <h1>{info.detail.release_date}</h1>
            <h1>{info.detail.genres.map((g) => g.name).join(",")}</h1>
            <h1>{info.detail.runtime}min</h1>
          </div>

          <h1 className="text-xl font-semibold italic text-zinc-200 mt-5">
            {info.detail.tagline}
          </h1>

          <h1 className=" text-2xl mt-3 mb-1">Overview</h1>
          <p className="leading-4 w-[80%] mb-10">{info.detail.overview}</p>

          <Link
            to={`${pathname}/trailer`}
            className="py-4 px-6 bg-[#6556cd] rounded-lg"
          >
            <i className="ri-play-large-fill mr-3"></i>
            Play Trailer
          </Link>
        </div>
      </div>

      {/* part 3 available on platforms */}

      <div className="mt-5 flex flex-col gap-y-5 mb-10">
        {info.watchproviders && info.watchproviders.flatrate && (
          <div className="flex gap-x-5 items-center text-white">
            <h1 className="text-xl">Available on Platforms</h1>
            {info.watchproviders.flatrate.map((w, i) => (
              <img
                key={i}
                title={w.provider_name}
                className="w-[6vh] h-[6vh] object-cover rounded-md"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}
        {info.watchproviders && info.watchproviders.buy && (
          <div className="flex gap-x-5 items-center text-white">
            <h1 className="text-xl">Available to Buy</h1>
            {info.watchproviders.buy.map((w, i) => (
              <img
                key={i}
                title={w.provider_name}
                className="w-[6vh] h-[6vh] object-cover rounded-md"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}
        {info.watchproviders && info.watchproviders.rent && (
          <div className="flex gap-x-5 items-center text-white">
            <h1 className="text-xl">Available on Rent</h1>
            {info.watchproviders.rent.map((w, i) => (
              <img
                key={i}
                title={w.provider_name}
                className="w-[6vh] h-[6vh] object-cover rounded-md"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}
      </div>

      {/* Part 4 Recommendations and similar stuff */}
      <hr className="border-none h-[1px] bg-zinc-400" />
      <h1 className="text-3xl font-bold text-white my-5">Recommendations</h1>
      <HorizontalCards
        data={
          info.recommendations.length > 0 ? info.recommendations : info.similar
        }
      />
      <Outlet />
    </div>
  ) : (
    <Loading />
  );
};

export default MovieDetails;
