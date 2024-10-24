import React, { useEffect, useState } from "react";
import axios from "../lib/axios";
import ListCompo from "./ListCompo";
import { Navigate, useParams } from "react-router-dom";
import Comment from "./Comment.jsx";

const ListIn = () => {
  const id = useParams();
  const [post, sPost] = useState({});
  const [content, sContent] = useState("");
  const [urender, urRender] = useState(false);
  const [comment, sComment] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/posts/${id}`)
      .then((res) => res.data.data)
      .then((data) => sPost(data))
      .then(
        axios
          .get(`http://localhost:8000/api/comments?post-id=${id}`)
          .then((res) => res.data.data)
          .then((data) => sComment(data))
      );
  }, [id, urender]);
  const updater = () => {
    // Navigate("http://localhost:3000/");
  };
  const deleter = () => {
    axios.delete(`http://localhost:8000/api/post/${id}`);
    Navigate("http://localhost:3000/");
  };
  const commentOn = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:8000/api/comments`, {
      postId: `${id}`,
      content: content,
    });
    urRender(!urender);
    sContent("");
  };

  return (
    <div>
      <ListCompo
        category={post.category}
        author={post.author}
        date={post.updated_at}
        title={post.title}
      />
      <div>
        <button onClick={updater}>글 수정</button>
        <button onClick={deleter}>글 삭제</button>
      </div>

      <div>
        <h3>내용</h3>
        <text>{post.content}</text>
      </div>
      <hr />

      <form onSubmit={commentOn}>
        <input value={content} onChange={(e) => sContent(e.target.value)} />
        <button>작성</button>
      </form>
      {comment.map((data) => {
        return (
          <Comment
            key={data.id}
            data={data}
            urender={urender}
            urRender={urRender}
          />
        );
      })}
    </div>
  );
};

export default ListIn;
