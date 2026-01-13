
import { Navigate, useNavigate } from 'react-router'

export default function Users(props) {
  const navigate = useNavigate();
  const { users } = props;



  return (
    <div className='user-card-div'>
      {users.map(user =>
        <div className='user-card' key={user.id} onClick={() => { navigate(`/users/${user.id}`) }}>
          <h2>{user.name}</h2>
          <p><a href={`http://${user.website}`} target="_blank" rel="noreferrer">{user.website}</a></p>
          <p>{user.company.name}</p>
          <p>{user.company.catchPhrase}</p>
          

        </div>


      )}

    </div>



  )
}
