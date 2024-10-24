import React, { useState } from "react";
import axios from "../lib/axios";

const NComment = ({ data, render, sRender }) => {
  const [nestComment, sNestComment] = useState(data);
  const [appear, nAppear] = useState(false);
  const [content, sContent] = useState("");
  const id = data.id;
  const deleter = () => {
    axios.delete(`http://localhost:8000/api/nested-comments/${nestComment.id}`);
    sRender(!render);
  };
  const remake = async () => {
    await axios.put(
      `http://localhost:8000/api/nested-comments/${nestComment.id}`,
      {
        content: content,
      }
    );

    sContent("");
    nAppear(!appear);
    sRender(!render);
  };
  return (
    <div>
      NC*
      <text>{nestComment.content}</text>
      <button
        onClick={() => {
          nAppear(!appear);
        }}
      >
        수정
      </button>
      <button onClick={deleter}>삭제</button>
      {appear ? (
        <>
          <input
            type="textbox"
            value={content}
            onChange={(e) => sContent(e.target.value)}
          />
          <button onClick={remake}>완료</button>
        </>
      ) : null}
    </div>
  );
};

export default NComment;
