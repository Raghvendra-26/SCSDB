import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { asyncloudperson, removeperson } from "../store/actions/personActions";
import Loading from "../components/Loading";
import HorizontalCards from "./templates/HorizontalCards";
import Dropdown from "./templates/Dropdown";

const PersonDetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.person);
  const dispatch = useDispatch();
  const [category, setCategory] = useState("movie");

  useEffect(() => {
    dispatch(asyncloudperson(id));
    return () => {
      dispatch(removeperson());
    };
  }, [id]);

  console.log(info);
  return info ? (
    <div className="w-screen px-[7%] h-fit bg-[#1F1E24] flex flex-col py-[1%]">
      {/* part 1 navigation */}
      <nav className="w-full h-[10vh] text-3xl text-zinc-100 flex items-center gap-10">
        <Link
          onClick={() => navigate(-1)}
          className="ri-arrow-left-line hover:text-[#6556cd] mr-3"
        ></Link>
      </nav>

      <div className="w-full flex mt-5">
        {/* part 2 poster and details */}
        <div className="w-[20%]">
          <img
            className="object-cover shadow-[8px_17px_18px_2px_rgba(0,0,0,0.5)] h-[50vh]"
            src={`https://image.tmdb.org/t/p/original/${info.detail.profile_path}`}
            alt=""
          />
          <hr className="border-none mt-10 mb-5 h-[1px] bg-zinc-400" />
          {/* Links and social media */}
          <div className="text-2xl text-white flex gap-x-5">
            <a
              title="wikidata"
              target="_blank"
              href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
            >
              <i className="ri-global-line hover:text-[#6556cd]"></i>
            </a>
            <a
              title="facebook"
              target="_blank"
              href={`https://www.facebook.com/${info.externalid.facebook_id}`}
            >
              <i class="ri-facebook-circle-fill hover:text-[#6556cd]"></i>
            </a>
            <a
              title="instagram"
              target="_blank"
              href={`https://www.instagram.com/${info.externalid.instagram_id}`}
            >
              <i class="ri-instagram-fill hover:text-[#6556cd]"></i>
            </a>
            <a
              title="twitter"
              target="_blank"
              href={`https://www.twitter.com/${info.externalid.twitter_id}`}
            >
              <i class="ri-twitter-x-line hover:text-[#6556cd]"></i>
            </a>
          </div>

          {/* personal info */}
          <h1 className="text-2xl font-semibold my-5 text-zinc-400">
            Personal Info :-
          </h1>

          <h1 className="text-lg font-semibold text-zinc-400">Profession</h1>
          <h1 className="text-zinc-400 mb-3">
            {info.detail.known_for_department}
          </h1>

          <h1 className="text-lg font-semibold text-zinc-400">Gender</h1>
          <h1 className="text-zinc-400 mb-3">
            {info.detail.gender === 2 ? "Male" : "Female"}
          </h1>

          <h1 className="text-lg font-semibold text-zinc-400">Birthday</h1>
          <h1 className="text-zinc-400 mb-3">{info.detail.birthday}</h1>

          <h1 className="text-lg font-semibold text-zinc-400">Deathday</h1>
          <h1 className="text-zinc-400 mb-3">
            {info.detail.deathday ? info.detail.deathday : "Alive"}
          </h1>

          <h1 className="text-lg font-semibold text-zinc-400">
            Place of Birth
          </h1>
          <h1 className="text-zinc-400 mb-3">{info.detail.place_of_birth}</h1>

          <h1 className="text-lg font-semibold text-zinc-400">Also Known as</h1>
          <h1 className="text-zinc-400 mb-3">
            {info.detail.also_known_as.join(", ")}
          </h1>
        </div>

        {/* part 3 details and information */}
        <div className="ml-[5%] w-[75%]">
          <h1 className="text-6xl font-black text-zinc-200">
            {info.detail.name}
          </h1>

          <h1 className="text-xl font-semibold text-zinc-400 mt-5">
            Biography
          </h1>
          <p className="text-zinc-400 mt-3">{info.detail.biography}</p>

          <h1 className="text-xl font-semibold text-zinc-400 mt-5 mb-3">
            Known For
          </h1>
          <HorizontalCards data={info.combinedCredits.cast} />
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default PersonDetails;
