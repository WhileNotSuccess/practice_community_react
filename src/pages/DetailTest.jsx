import React, { useEffect, useState, useRef } from 'react'
import axios from '../lib/axios'
import CommnetTest from './CommnetTest';

const DetailTest = () => {
  const content = useRef(null)
  const [render,setRender] = useState(false)
  const id = 10;
  const [data,setData] = useState({
    title: '',
    content: '',
    author: '',
    updated_at: '',
    category: ''
  })
  const [comments,setComments] = useState([])
  useEffect(()=>{
    axios.get(`http://localhost:8000/api/posts/${id}`)
    .then(res=>res.data.data)
    .then(data=>setData(data))
    axios.get(`http://localhost:8000/api/comments?post-id=${id}`)
    .then(res=>res.data.data)
    .then(data=>setComments(data))
  },[render])
  const onClickComment = ()=>{
    axios.post(`http://localhost:8000/api/comments`,{
      postId: `${id}`,
      content: content.current.value
    }).then(()=>setRender(!render))
  }
  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.content}</p>  
      <p>{data.author}</p>
      <p>{data.updated_at}</p> 
      <p>{data.category}</p>
      <div>--------------------------------</div>
      <div><input ref={content} type="text" /></div>
      <div><button onClick={onClickComment}>댓글 작성</button></div>
      {comments.map((item)=>{
        return <CommnetTest key={item.id} data={item}/>
      })}
    </div>
  )
}

export default DetailTest