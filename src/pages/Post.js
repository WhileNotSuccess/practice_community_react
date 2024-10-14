import React, { useState } from "react";
import PathName from "./PathName";
import "../css/PostComp.css";
import { PostCompo, UserInfo } from "../components/MainComp";
import { useEffect } from "react";
import axios from "../lib/axios";
import { useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const Post = () => {
  const [loginUser, setLoginUser] = useState([]);
  const [postCategory, setPostCategory] = useState([]);
  const [boardName, setBoardName] = useState("자유게시판");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [editor, setEditor] = useState(null);
  const navigate = useNavigate();

  /*   const csrfToken = document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute("content");

  axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken; */
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

  const GoToMain = () => {
    navigate("/");
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
      author: "test",
    };
    axios
      .post(`http://localhost:8000/api/posts`, postThing)
      .then((res) => {
        console.log("성공했습니다", res.data);
      })
      .catch((error) => {
        console.error("실패했습니다", error);
      });
  };

  const imageInput = () => {
    if (image) {
      image.click();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result; // 이미지 URL 생성
        const imageTag = `<img src="${imageUrl}" alt="Image" style="max-width: 100%; height: auto;" />`;
        if (editor) {
          // CKEditor에 이미지 추가
          editor.setData(editor.getData() + imageTag);
        }
      };
      reader.readAsDataURL(file); // 파일을 데이터 URL로 읽기
    }
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
        <div className="image-box" onClick={imageInput}>
          <div className="image-btn">
            {
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                ref={(input) => setImage(input)}
                onChange={handleImageChange}
              />
            }
            <>이미지 업로드</>
          </div>
        </div>
        <div className="content-write">
          <div className="ckeditor">
            <CKEditor
              editor={ClassicEditor}
              data=""
              onReady={(editorInstance) => {
                setEditor(editorInstance); // editor 상태 업데이트
              }}
              onChange={(event, editorInstance) => {
                const data = editorInstance.getData();
                setContent(data); // CKEditor 내용 상태 업데이트
              }}
            />
          </div>
        </div>
        <div className="btns-box">
          <div className="upload-btn" onClick={onclick}>
            <>업로드</>
          </div>
          <div className="upload-btn" onClick={GoToMain}>
            취소
          </div>
        </div>
      </div>

      <div>
        <UserInfo GoToLogin={GoToLogin} GoToSignIn={GoToSignIn} />
      </div>
    </div>
  );
};

export default Post;
