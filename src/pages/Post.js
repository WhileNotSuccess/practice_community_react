import React, { useState } from "react";
import PathName from "./PathName";
import "../css/PostComp.css";
import { PostCompo, UserInfo } from "../components/MainComp";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Post = () => {
  const [loginUser, setLoginUser] = useState([]);
  const [postCategory, setPostCategory] = useState([]);
  const [boardName, setBoardName] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  /*   useEffect(() => {
    axios.get("http://localhost:8000/category").then((res) => {
      setPostCategory(res.data);
    });
  }, []); */

  const GoToLogin = () => {
    navigate("/login");
  };

  const GoToSignIn = () => {
    navigate("/sign-in");
  };

  const titlechange = (e) => {
    setTitle(e.target.value);
    console.log(title);
  };

  const contentchange = (e) => {
    setContent(e.target.value);
    console.log(content);
  };

  const onclick = () => {
    const postThing = {
      title: title,
      content: content,
      category: boardName,
    };
    axios
      .post(`http://localhost:8000/api/posts?category=${boardName},`, postThing)
      .then((res) => {
        console.log("성공했습니다", res.data);
      })
      .catch((error) => {
        console.error("실패했습니다", error);
      });
  };
  return (
    <div className="post-board">
      <div className="board-tag">
        <div className="board-list">
          {/*           {postCategory.map((category) => (
            <PostCompo key={category.id} category={category} />
          ))} */}
        </div>
      </div>
      <div className="test">
        <div className="title-board">
          <select
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
            className="board-select"
          >
            <option value={"자유게시판"}>자유게시판</option>
            <option value={"공지사항"}>공지사항</option>
            <option value={"축제게시판"}>축제게시판</option>
          </select>
          <input placeholder="제목" onChange={titlechange}></input>
        </div>
        <div className="user-name">유저명</div>
        <div className="image-box">
          <div className="image-btn"></div>
        </div>
        <div className="content-write">
          <textarea
            placeholder="내용"
            className="content-text"
            onChange={contentchange}
          ></textarea>
        </div>
        <div className="btns-box">
          <div className="upload-btn" onClick={onclick}>
            업로드
          </div>
          <div className="upload-btn">취소</div>
        </div>
      </div>

      <div>
        <UserInfo GoToLogin={GoToLogin} GoToSignIn={GoToSignIn} />
      </div>
    </div>
  );
};

export default Post;
