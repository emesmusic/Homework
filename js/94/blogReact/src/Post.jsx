import React, { useState } from 'react'
import { useOutletContext, useParams } from 'react-router'
import Comments from './Comments.jsx'
export default function Post() {
  const { posts } = useOutletContext();
  const { postId } = useParams();

  const [commentsVisible, setCommentsVisible] = useState(false);



  const post = posts.find(p => p.id === parseInt(postId));
  console.log(post);






  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <button onClick={() => setCommentsVisible(!commentsVisible)}>{commentsVisible ? 'Hide Comments' : 'Show Comments'}</button>
      <Comments isVisible={commentsVisible} postId={postId}  />
    </div>
  )
}
