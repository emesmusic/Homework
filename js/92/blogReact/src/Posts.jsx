import React from 'react'
import { useNavigate, useOutletContext, useParams } from 'react-router'

export default function Posts() {
    const { posts } = useOutletContext();
    const navigate = useNavigate();
    const { userId } = useParams();

    return (<div id='posts-list'>
        {
            posts.map(post => (
                <div className='post-card' key={post.id} onClick={() => navigate(`/users/${userId}/posts/${post.id}`)}>
                    <h3>{post.title}</h3>
                </div>

            ))

        }
    </div>)
}
