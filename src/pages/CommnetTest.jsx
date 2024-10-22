import React, { useEffect, useState } from 'react'
import axios from '../lib/axios'
import NestedComment from './NestedComment'
const CommnetTest = ({data}) => {
  const [nested,setNested] = useState([])
  useEffect(()=>{
    axios.get(`http://localhost:8000/api/nested-comments?comment-id=${data.id}`)
    .then(res=>res.data.data)
    .then(data=>setNested(data))
  },[])
  const onClickDelete = ()=>{
    axios.delete(`http://localhost:8000/api/comments/${data.id}`)
  }
  return (
    <div style={{border:'1px solid black',padding:'10px'}}>
      <div>{data.content}</div>
      <div>{data.author}</div>
      <div>{data.updated_at}</div>
      {nested.map((item)=>{
        return <NestedComment key={item.id} data={item}/>
      })}
      <button onClick={onClickDelete}>삭제</button>
    </div>
  )
}

export default CommnetTest