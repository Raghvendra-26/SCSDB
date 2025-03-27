import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "../components/templates/Topnav";
import Dropdown from "../components/templates/Dropdown";
import axios from "../utils/axios";
import Cards from "./templates/Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const People = () => {
  const [category, setCategory] = useState("popular");
  const [people, setPeople] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  document.title = "SCSDB | People ";
  const navigate = useNavigate();

  const getTVshows = async () => {
    try {
      const { data } = await axios.get(`/person/${category}?page=${page}`);
      setPeople((prevPeople) => [...prevPeople, ...data.results]);
      setPage(page + 1);
      if (data.results.length === 0) setHasMore(false);
      // console.log(data);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    setPeople([]); // Clear previous data
    setPage(1); // Reset page to 1
    setHasMore(true);
    getTVshows();
  }, [category]);

  return people.length > 0 ? (
    <div className="w-screen h-screen py-[1%]">
      <div className="w-full flex items-center px-[3%]">
        <h1 className="text-2xl font-semibold text-zinc-400 flex items-end gap-2">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line hover:text-[#6556cd] mr-3"
          ></i>
          People
        </h1>

        <Topnav />

      </div>

      <InfiniteScroll
        dataLength={people.length}
        next={getTVshows}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={people} title="person" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default People;
