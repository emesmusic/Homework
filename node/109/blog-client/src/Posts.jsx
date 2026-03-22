import React, { useState, useEffect } from 'react'
import Post from './Post';
import io from 'socket.io-client';

export default function Posts({ setError }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('http://localhost:8080/posts');
        if (!response.ok) {
          const msg = await response.text();
          throw new Error(`${response.status} - ${msg ?? response.statusText}`);
        }
        const postData = await response.json();
        setPosts(postData);
      } catch (e) {
        console.error(e);
        setError(e.message);
      }
    })();
  }, []);


  useEffect(() => {

    const socketIo = io('http://localhost:8080');
    function addPost(post) {
      ;
      setPosts(posts => [...posts, post]);
    }



    function addComment(comment) {
      setPosts(posts => 
        posts.map(p => {
          if (p._id === comment._id) {
            return {
              ...p,
              comments: p.comments ? [...p.comments, comment] : [comment]
            }
          }
          return p;
        })
      );


    }
    socketIo.on('comment', addComment);
    socketIo.on('post', addPost);
    return () => {

      socketIo.off('post', addPost);
      socketIo.off('comment', addComment)
      socketIo.close();
    }
  }, []);

  return (
    <div>
      {posts?.map(p => <Post key={p._id} post={p} setError={setError} />)}
    </div>
  )
}
