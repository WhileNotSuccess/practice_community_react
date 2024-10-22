import axios from "../lib/axios";
import React, { useEffect, useState } from "react";

const Comment = ({ id, reid, postComment }, setPostComment) => {
  const [comment, sComment] = useState([]);

  const [content, sContent] = useState("");
  const [render, sRender] = useState(false);
  //댓글 수정
  const remake = async (id) => {
    reid
      ? await axios.put(`http://127.0.0.1:8000/api/nested-comments/${id}`, {
          content: content,
        })
      : await axios
          .put(`http://127.0.0.1:8000/api/comments/${id}`, {
            content: content,
          })
          .then((res) => console.log(res));
    sContent("");
    setPostComment(0);
    sRender(!render);
  };
  //댓글 작성
  const onComment = async (id) => {
    reid
      ? await axios.post(`http://127.0.0.1:8000/api/nested-comments`, {
          content: content,
          commentId: id,
        })
      : await axios.post(`http://127.0.0.1:8000/api/comments`, {
          content: content,
          postId: id,
        });
    sContent("");
    sRender(!render);
    setPostComment(0);
  };

  //댓글 삭제
  const deleteComment = async ({ id }) => {
    reid
      ? await axios.delete(`http://127.0.0.1:8000/api/nested-comments/${id}`)
      : await axios.delete(`http://127.0.0.1:8000/api/comments/${id}`);
    sRender(!render);
  };

  useEffect(() => {
    reid
      ? axios
          .get(`http://127.0.0.1:8000/api/nested-comments?comment-id=${reid}`)
          .then((res) => sComment(res.data.data))
      : axios
          .get(`http://127.0.0.1:8000/api/comments?post-id=${id}`)
          .then((res) => sComment(res.data.data));
  }, [id, reid, render, postComment]);

  return (
    <div>
      {comment.map((data) => {
        return (
          <div key={data.id}>
            {reid ? <img src="../img/search.jpg" /> : null}
            {postComment === data.id ? (
              <>
                <form onSubmit={() => remake(data.id)}>
                  <input
                    value={content}
                    onChange={(e) => sContent(e.target.value)}
                  />
                  <button>작성</button>
                </form>
              </>
            ) : (
              <>
                <text>
                  {data.content}
                  {data.id}
                </text>
                <button onClick={() => setPostComment(data.id)}>수정</button>

                {reid ? null : (
                  <button
                    onClick={() => {
                      setPostComment(data.id * -1);
                    }}
                  >
                    댓글
                  </button>
                )}
                <button onClick={() => deleteComment(data.id)}>삭제</button>
              </>
            )}
            {postComment === data.id * -1 ? (
              <>
                <form onSubmit={() => onComment(data.id)}>
                  <input
                    value={content}
                    onChange={(e) => sContent(e.target.value)}
                  />
                  <button>작성</button>
                </form>
              </>
            ) : null}
            {id ? <Comment reid={data.id} /> : null}
          </div>
        );
      })}
    </div>
  );
};

export default Comment;
