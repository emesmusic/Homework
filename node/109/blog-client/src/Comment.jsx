import React from 'react'
import dayjs from "dayjs";


export default function Comment(props) {
  const {body, author, date} = props.comment;
  return (
    <div>
      <h5>{body}</h5>
      <h6>by {author} on {dayjs(date).fromNow()}</h6>
    </div>
  )
}
