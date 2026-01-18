import React from 'react'
import { useOutletContext } from 'react-router'
import Comments from './comments';
import { useState } from 'react';

export default function Posts() {
    const { posts } = useOutletContext();
    const [showComments, setShowComments] = useState({});

    function handleToggleComments(postId) {
        setShowComments(prevState => ({ ...prevState, [postId]: !prevState[postId] }))

    }
    return (<div className='posts-list'>
        {
            posts.map(post => (
                <div className='post-card' key={post.id} >
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                    <button onClick={() => handleToggleComments(post.id)}>{showComments[post.id] ? 'Hide Comments' : 'Show Comments'}</button>

                    <hr />
                    <Comments isVisible={showComments[post.id]} postId={post.id} />
                </div>

            ))

        }
    </div>)
}
