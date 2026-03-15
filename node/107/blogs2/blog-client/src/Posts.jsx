import React from 'react'
import { useEffect, useState } from 'react'
import './App.css'

export default function Posts() {
  const [content, setContent] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('http://localhost:8080/posts');
        if (! response.ok) {
          throw new Error(`${response.status} - ${response.statusText}`);
        }
        const posts = await response.json();
        console.log(posts);
        setContent(posts);
      } catch(e) {
        console.error(e);
      }
    })();
  }, []);

  return (
    <div>{
      content.map(post=>(<div key={post.id}>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
        <p>By {post.author} at {new Date(post.date).toLocaleString()}</p>
      </div>))
      }</div>
  )
}
