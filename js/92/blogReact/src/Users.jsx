import React from 'react'

export default function Users(props) {
  



  return (
    <>
      {props.users.map(user =>
        <div className='user-card' key={user.id}>
          <h2>{user.name}</h2>
          <p><a href={`http://${user.website}`} target="_blank" rel="noreferrer">{user.website}</a></p>
          <p>{user.company.name}</p>
          <p>{user.company.catchPhrase}</p>
          <hr />

        </div>


      )}

    </>



  )
}
