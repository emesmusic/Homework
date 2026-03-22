import React from 'react'

export default function Logout(props) {
  const { setUserName, userName } = props;
async function logout(){
  try{

const response = await fetch('http://localhost:8080/logout', {
  method: 'POST',
  credentials: 'include'
});
if(!response.ok){
  throw new Error(`${response.status} - ${response.statusText}`);
}


    setUserName()
  }catch(e){
    console.error(e);
  }
  
}
  return (
    <div>
      logged in as {userName}
      <button onClick={logout}>Logout</button>
    </div>
  )
}
