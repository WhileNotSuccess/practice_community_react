import React from 'react'

const NestedComment = ({data}) => {
  return (
    <div style={{border:'1px solid red',padding:'10px'}}>
      <div>{data.content}</div>
      <div>{data.author}</div>
      <div>{data.updated_at}</div>
    </div>
  )
}

export default NestedComment