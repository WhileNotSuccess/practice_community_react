import React from "react";
import "../css/MainComp.css";

export const MainCompo = (props) => {
  return (
    <div className="line-change">
      <span>
        [{props.category}] {props.title} {props.date}
        <br />
      </span>
    </div>
  );
};

export const PostCompo = (props) => {
  return (
    <div className="line-change">
      <span>
        {props.category.board_name}
        <br />
      </span>
    </div>
  );
};


export const UserInfo = (props) => {
  return (
    <>
      <div className="user-info">
        <div className="user-login">
          <div onClick={props.GoToLogin}>로그인</div>
        </div>
        <div className="logout-btn">
          <div onClick={props.GoToSignIn}>회원가입</div>
        </div>
      </div>
    </>
  );
};