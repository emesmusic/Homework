import React, { useEffect, useState } from 'react'

export default function Comments(props) {
  const { isVisible, postId } = props;
  const [comments, setComments] = useState([]);
  useEffect( () => {

    (async function () {
      try {
        const commentsResponse = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId} `)
        if (!commentsResponse.ok) {
          throw new Error(`${commentsResponse.status} - ${commentsResponse.statusText}`)
        }
        else {
          setComments(await commentsResponse.json());
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    })()
  }, [postId]);
  


  return (
    <div className={isVisible ? 'visible' : 'hidden'}>
      {comments.map(comment => (
        <div className='comment-card'>
          <h4>{comment.name} ({comment.email})</h4>
          <p>{comment.body}</p>
          <hr />
        </div>
      ))}




    </div>
  )
}
