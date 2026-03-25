import React, { useEffect, useState } from 'react'
import { Outlet, useParams } from 'react-router'

export default function UserHeader(props) {
  const { userId } = useParams();
  let [posts, setPosts] = useState([]);
  const { users } = props;

  const userInfo = users.find(user => user.id === parseInt(userId));


  useEffect(() => {
    (async function () {
      try {
        const postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
        if (!postResponse.ok) {
          throw new Error(postResponse.status + ' - ' + postResponse.statusText)
        }
        setPosts(await postResponse.json());



      } catch (error) {
        console.error('Error fetching posts:', error.message)
      }


    })();



  }, [userId]);




  return (

    <>
      {userInfo && <div className='user-header' >
        <h2>{userInfo.name}</h2>
        <p><a href={`http://${userInfo.website}`} target="_blank" rel="noreferrer">{userInfo.website}</a></p>
        <p>{userInfo.company.name}</p>
        <p>{userInfo.company.catchPhrase}</p>

      </div>  }

      <Outlet context={{ posts }} />
    </>
  )
}
