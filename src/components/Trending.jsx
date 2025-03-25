import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "../components/templates/Topnav";
import Dropdown from "../components/templates/Dropdown";
import axios from "../utils/axios";
import Cards from "./templates/Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const Trending = () => {
  const [duration, setDuration] = useState("day");
  const [category, setCategory] = useState("all");
  const [trending, setTrending] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  document.title = "SCSDB | Trending ";

  const getTrending = async () => {
    try {
      const { data } = await axios.get(
        `trending/${category}/${duration}?page=${page}`
      );
      setTrending((prevTrending) => [...prevTrending, ...data.results]);
      setPage(page + 1);
      if (data.results.length === 0) setHasMore(false);
      console.log(data);
    } catch (error) {
      console.log("Error: ", error);
    }
  };    

  useEffect(() => {
    setTrending([]); // Clear previous data
    setPage(1); // Reset page to 1
    setHasMore(true);
    getTrending();
  }, [category, duration]);

  const navigate = useNavigate();
  return trending.length > 0 ? (
    <div className="w-screen h-screen py-[1%]">
      <div className="w-full flex items-center px-[3%]">
      <h1 className="text-2xl font-semibold text-zinc-400 flex items-end gap-2">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line hover:text-[#6556cd] mr-3"
          ></i>
          Trending <small className="text-sm text-zinc-600">({category})</small>
        </h1>

        <Topnav />
        <Dropdown
          title="Category"
          options={["movie", "tv", "all"]}
          func={(e) => setCategory(e.target.value)}
        />
        <div className="w-[2%]"></div>
        <Dropdown
          title="Duration"
          options={["week", "day"]}
          func={(e) => setDuration(e.target.value)}
        />
      </div>

      <InfiniteScroll
        dataLength={trending.length}
        next={getTrending}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={trending} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Trending;
