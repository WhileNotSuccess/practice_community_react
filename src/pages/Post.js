import React, { useState } from "react";
//import PathName from "./PathName";
import "../css/PostComp.css";
import { PostCompo, UserInfo, UserInfoCompo } from "../components/MainComp";
import { useEffect } from "react";
import axios from "../lib/axios";
import { useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useAuth } from "../hooks/auth";

class MyUploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  upload() {
    return new Promise((resolve, reject) => {
      this.loader.file.then((file) => {
        console.log("Loaded file:", file); // 파일 정보 확인
        const data = new FormData();
        data.append("image", file);

        axios
          .post("http://localhost:8000/api/image-upload", data, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            const imgUrl = res.data;
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
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();
  const { logout } = useAuth();
  /*   const csrfToken = document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute("content");

  axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken; */
  /*   useEffect(() => {
    axios.get("http://localhost:8000/category").then((res) => {
      setPostCategory(res.data);
    });
  }, []); */

  const adapter = (editorInstance) => {
    editorInstance.plugins.get("FileRepository").createUploadAdapter = (
      loader
    ) => {
      return new MyUploadAdapter(loader);
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

  if (loading) {
    return <div>loading...</div>;
  }

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
        <div className="user-name">
          <>작성자 : {user.nick_name}</>
        </div>
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
              onUpload={(event, editorInstance) => {
                const imageFile = event.data.file;
                setImage(imageFile); // 이미지 상태에 파일 저장
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
        <UserInfoCompo user={user} />
      </div>
    </div>
  );
};

export default Post;
