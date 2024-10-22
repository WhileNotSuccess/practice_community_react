import React, { useEffect, useState } from "react";
import axios from "../lib/axios";
import Comment from "./Comment";
import ListCompo from "./ListCompo";
import { Navigate } from "react-router-dom";

const ListIn = ({ id }) => {
  const [data, setdata] = useState([]);
  const [postComment, setPostComment] = useState(0); // 수정시 양수id 댓글작성시 음수id
  const [content, sContent] = useState("");
  const [makeComment, makeContent] = useState(false);
  id = 10;
  const updater = () => {};
  const deleter = () => {
    axios.delete(`http://127.0.0.1:8000/api/posts/${id}`); //response로 지워야할 comment의 id 받아올 수 있는가?
    Navigate("http://localhost:3000");
  };
  const commentOn = async (e) => {
    e.preventDefault();
    await axios.post(`http://127.0.0.1:8000/api/comments`, {
      postId: id,
      content: content,
    });
    makeContent(false);
  };
  //댓글 삭제
  const deleteCom = ({ id }) => {
    axios.delete(`http://127.0.0.1:8000/api/comments/${id}`);
  };
  //대댓글 삭제
  const deleteNeCom = ({ id }) => {
    axios.delete(`http://127.0.0.1:8000/api/nested-comments/${id}`);
  };
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/posts/${id}`)
      .then((res) => res.data.data)
      .then((data) => {
        setdata(data);
      });
  }, [id]);
  return (
    <div>
      <ListCompo
        category={data.category}
        author={data.author}
        date={data.updated_at}
        title={data.title}
      />
      <div>
        <button onClick={updater}>글 수정</button>
        <button onClick={deleter}>글 삭제</button>
      </div>

      <div>
        <h3>내용</h3>
        <text>{data.content}</text>
      </div>
      <hr />
      {makeComment ? (
        <>
          <form onSubmit={commentOn}>
            <input value={content} onChange={(e) => sContent(e.target.value)} />
            <button>작성</button>
          </form>
        </>
      ) : (
        <button onClick={() => makeContent(true)}>댓글 작성</button>
      )}

      <Comment
        id={id}
        deleteCom={deleteCom}
        deleteNeCom={deleteNeCom}
        postComment={postComment}
        setPostComment={setPostComment}
      />
    </div>
  );
};

export default ListIn;
