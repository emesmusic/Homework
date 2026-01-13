import React, { useEffect, useState } from 'react'

export default function Comments(props) {
  const { isVisible, postId } = props;
  const [comments, setComments] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const errorMessage = 'Error fetching comments: ';
  
useEffect( () => {
if(isVisible && !comments)
{loadComments();}
},[isVisible]);

    async function loadComments () {
      try {
        setError(null);
        const commentsResponse = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId} `)
        if (!commentsResponse.ok) {
          throw new Error(`${commentsResponse.status} - ${commentsResponse.statusText}`)
        }
        else {
          setComments(await commentsResponse.json());
        }
      } catch (error) {

        console.error(errorMessage);
        setError(errorMessage + error.message);
      }
      finally {
        setLoading(false);
      }
    }
 


  return (
    <div className={`comments-box ${isVisible ? 'visible' : 'hidden'}`}>
      {loading && (<img src='/loading.gif' alt='Loading...' />)}
      {error && (<p className='error-message'>{error}</p>)}
      {
        !loading && !error &&  (
          comments.map(comment => (
            <div className='comment-card'>
              <h4>{comment.name} ({comment.email})</h4>
              <p>{comment.body}</p>
              <hr />
            </div>
          ))
        )}


    </div>
  )
}
