import React from 'react'
import { useNavigate } from 'react-router'

export default function Error() {
  const navigate = useNavigate();


  return (
    <div>
      <h1>Error</h1>
      <h5>
        Either we messed up or you did.
      </h5>
      <button onClick={()=>navigate(-1)}>Go Back</button>
    </div>

  )
}
