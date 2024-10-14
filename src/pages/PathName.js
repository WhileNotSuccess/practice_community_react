import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const PathName = (props) => {
  switch (props.location) {
    case "/login":
      return "[로그인]";
    case "/":
      return "[자유게시판]";
    case "/post":
      return "[글 작성]";
  }

  return <div>{props.location}</div>;
};

export default PathName;
