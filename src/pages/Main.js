import React from "react";
import "../css/MainComp.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { MainCompo, PostCompo, UserInfo } from "../components/MainComp";
import { useNavigate, useLocation } from "react-router-dom";
import PathName from "./PathName";
import topIcon from "../img/topicon.png";

const Main = () => {
  const [list, setList] = useState([]);
  const [category, setCategory] = useState([]);
  const [date, setDate] = useState("");
  const [page, setPages] = useState(10);
  const [h_announce, sh_announce] = useState(true);
  const [announce, setAnnounce] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    axios
      .get("http://localhost:3001/list")
      .then((res) => {
        return res.data;
      })
      .then((rel) => {
        setList(rel.filter((ral) => ral.category !== "공지사항"));
        setAnnounce(rel.filter((ral) => ral.category === "공지사항"));
      });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3001/category").then((res) => {
      setCategory(res.data);
    });
  }, []);

  useEffect(() => {
    const today = new Date();
    setDate(
      today
        .toLocaleDateString("ko-kr", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .replace(/\. /g, "/")
        .replace(/\.$/, "")
    );
  }, []);

  const GoToLogin = () => {
    navigate("/login");
  };

  const GoToSignIn = () => {
    navigate("/sign-in");
  };

  const GoToPost = () => {
    navigate("/post");
  };

  const ScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container">
      <div className="board-tag">
        <div className="board-list">
          {category.map((category) => (
            <PostCompo key={category.id} category={category} />
          ))}
        </div>
      </div>

      <div className="post-list">
        <div className="go-post">
          <div>
            <h4 onClick={GoToPost} style={{ "font-size": "bold" }}>
              글작성
            </h4>
          </div>
        </div>
        <div className="name-and-options">
          <span className="board-name">
            <PathName location={location.pathname} />
          </span>
          <div className="options-container">
            <form
              onClick={() => {
                sh_announce(!h_announce);
              }}
            >
              <input
                type="checkbox"
                checked={h_announce}
                onChange={() => sh_announce(!h_announce)}
              />
              공지숨기기
            </form>
            <select
              value={page}
              onChange={(e) => setPages(e.target.value)}
              className="page-select"
            >
              <option value={10}>10개씩</option>
              <option value={20}>20개씩</option>
              <option value={30}>30개씩</option>
            </select>
          </div>
        </div>
        <hr />
        {h_announce === true
          ? null
          : announce.map((item) => (
              <MainCompo
                key={item.id}
                title={item.title}
                category={item.category}
                date={date}
              />
            ))}

        {list.map((item) => (
          <MainCompo
            key={item.id}
            title={item.title}
            category={item.category}
            date={date}
          />
        ))}
      </div>
      <UserInfo GoToLogin={GoToLogin} GoToSignIn={GoToSignIn} />
      <div className="top-icon" onClick={ScrollTop}>
        <img src={topIcon}></img>
      </div>
    </div>
  );
};

export default Main;
