import React from "react";
import "../css/MainComp.css";
import axios from "axios";

export const MainCompo = (props) => {
  return (
    <div className="line-change">
      <span>
        [{props.category}] {props.title}
        <br />
      </span>
    </div>
  );
};

export const CreateCategory = ({ boardName, categoryChange }) => {
  const CategoryButton = () => {
    categoryChange(boardName);
  };

  return (
    <div className="line-change">
      <span onClick={CategoryButton}>
        {boardName}
        <br />
      </span>
    </div>
  );
};

export const UserInfo = (props) => {
  return (
    <div className="user-info">
      <div className="user-login" onClick={props.GoToLogin}>
        로그인
      </div>
      <div className="logout-btn" onClick={props.GoToSignIn}>
        로그아웃
      </div>
    </div>
  );
};
