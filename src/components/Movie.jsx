import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "../components/templates/Topnav";
import Dropdown from "../components/templates/Dropdown";
import axios from "../utils/axios";
import Cards from "./templates/Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const Movie = () => {
  const [category, setCategory] = useState("now_playing");
  const [movie, setMovie] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  document.title = "SCSDB | Movies ";
  const navigate = useNavigate();

  const getMovie = async () => {
    try {
      const { data } = await axios.get(`/movie/${category}?page=${page}`);
      setMovie((prevMovie) => [...prevMovie, ...data.results]);
      setPage(page + 1);
      if (data.results.length === 0) setHasMore(false);
      console.log(data);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    setMovie([]); // Clear previous data
    setPage(1); // Reset page to 1
    setHasMore(true);
    getMovie();
  }, [category]);

  return movie.length > 0 ? (
    <div className="w-screen h-screen py-[1%]">
      <div className="w-full flex items-center px-[3%]">
        <h1 className="text-2xl font-semibold text-zinc-400 flex items-end gap-2">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line hover:text-[#6556cd] mr-3"
          ></i>
          Movie <small className="text-sm text-zinc-600">({category})</small>
        </h1>

        <Topnav />
        <Dropdown
          title="Category"
          options={["popular", "top_rated", "upcoming","now_playing"]}
          func={(e) => setCategory(e.target.value)}
        />
      </div>

      <InfiniteScroll
        dataLength={movie.length}
        next={getMovie}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={movie} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Movie;
