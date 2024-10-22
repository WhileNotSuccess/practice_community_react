import React, { useState } from "react";
//import PathName from "./PathName";
import "../css/PostComp.css";
import { PostCompo, UserInfo } from "../components/MainComp";
import { useEffect } from "react";
import axios from "../lib/axios";
import { useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

class MyUploadAdapter {
  constructor(loader, boardName) {
    this.loader = loader;
    this.boardName = boardName;
  }

  upload() {
    return new Promise((resolve, reject) => {
      const data = new FormData();
      this.loader.file.then((file) => {
        data.append("upload", file);

        axios
          .post(
            `http://localhost:8000/api/posts?category=${this.boardName}`,
            data
          )
          .then((res) => {
            imgUrl = res.data;
            console.log(res.data);
            resolve({
              default: imgUrl,
            });
          })
          .catch((error) => {
            reject(error);
          });
      });
    });
  }

  abort() {}
}

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

  const adapter = (editorInstance, boardName) => {
    editorInstance.plugins.get("FileRepository").createUploadAdapter = (
      loader
    ) => {
      return new MyUploadAdapter(loader, boardName);
    };
  };

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

  const onclick = (boardName) => {
    console.log(`http://localhost:8000/api/posts?category=${boardName}`);

    // FormData 객체 생성
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", boardName);

    if (image && image.files && image.files[0]) {
      formData.append("image", image.files[0]);
      console.log("이미지 파일:", image.files[0]);
    } else {
      console.log("이미지가 선택되지 않았습니다.");
    }

    axios
      .post(`http://localhost:8000/api/posts?category=${boardName}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log("성공했습니다", res.data);
        navigate("/");
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
        <div className="image-box" onClick={imageInput}></div>
        <div className="content-write">
          <div className="ckeditor">
            <CKEditor
              editor={ClassicEditor}
              data=""
              onReady={(editorInstance) => {
                setEditor(editorInstance);
                adapter(editorInstance, boardName);
              }}
              onChange={(event, editorInstance) => {
                setContent(editorInstance.getData());
              }}
            />
          </div>
        </div>
        <div className="btns-box">
          <div className="upload-btn" onClick={() => onclick(boardName)}>
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
