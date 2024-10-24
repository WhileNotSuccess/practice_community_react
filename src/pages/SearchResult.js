import { React, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../css/SearchResult.css";
import "../css/MainComp.css";
import axios from "axios";
import { UserInfoCompo } from "../components/MainComp";
import { CategoryCompo } from "../components/CategoryCompo";
import PostList from "../components/PostList";
import Pagination from "../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
const SearchResult = () => {
  const [postPerPage, setPostPerPage] = useState(10);
  const location = useLocation();
  const currentPage = useSelector((state) => state.currentPage);
  const [resultData, setResultData] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [prevPage, setPrevPage] = useState("");
  const [nextPage, setNextPage] = useState("");

  const dispatch = useDispatch();
  const fetchResult = async (page) => {
    const { data } = await axios.get(
      `http://localhost:8000/api/search?content=${location.state}&target=title&limit=${postPerPage}&page=${page}`
    );
    setResultData(data.data);
    setTotalPage(data.totalPage);
    setNextPage(data.nextPage);
    setPrevPage(data.prevPage);
    dispatch({ type: "CURRENTPAGE_CHANGE", payload: data.currentPage });
    dispatch({ type: "CURRENTPAGE_CHANGE", payload: data.currentPage });
  };
  useEffect(() => {
    fetchResult(currentPage);
    console.log(totalPage);
  }, [location.state, postPerPage]);

  const pageChange = async (url) => {
    const { data } = await axios.get(url);
    setResultData(data.data);
    dispatch({ type: "CURRENTPAGE_CHANGE", payload: data.currentPage });
    /*  setCurrentPage(data.currentPage); */
    setNextPage(data.nextPage);
    setPrevPage(data.prevPage);
    setTotalPage(data.totalPage);
  };
  const paginate = (pageNumber) => {
    fetchResult(pageNumber);
  };
  console.log(nextPage);
  return (
    <div className="container">
      <CategoryCompo />
      <div className="post-list">
        <div className="options-container">
          <div className="category-name">검색 결과</div>
          <div className="options-right">
            <select
              className="page-select"
              value={postPerPage}
              onChange={(e) => setPostPerPage(Number(e.target.value))}
            >
              <option value={10}>10개씩</option>
              <option value={20}>20개씩</option>
              <option value={30}>30개씩</option>
            </select>
          </div>
        </div>
        <div className="post-header">
          <span className="post-title">글 제목</span>
          <span className="post-date">작성일자</span>
        </div>
        <hr />
        {resultData.length > 0 ? <PostList list={resultData} /> : null}
      </div>
      <UserInfoCompo />
      <div className="down-banner">
        <Pagination
          postPerPage={postPerPage}
          prevPage={prevPage}
          nextPage={nextPage}
          totalPage={totalPage}
          paginate={paginate}
          currentPage={currentPage}
          pageChange={pageChange}
        />
      </div>
    </div>
  );
};

export default SearchResult;
