import React from 'react'
import { useNavigate } from 'react-router';
import './App.css';



export default function AddPost() {
  const navigate = useNavigate();
  async function handleSubmit(e){
    e.preventDefault();
    try{
    const response = await fetch('http://localhost:8080', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({author: e.target.author.value, body: e.target.body.value, title: e.target.title.value, date: new Date()})
    })
    const data = await response.json();
    console.log(data);
  }catch(error){
    console.log(error);
  }finally{
    navigate('/');
  }
  };



    



  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Author:
          <input type="text" name="author" required />
        </label>
        <label>
          Title:
          <input type="text" name="title" required />
        </label>
        <label>Content:
          <textarea name="body" required></textarea>
        </label>
        <button>Submit</button>
      </form>


    </div>
  )
}
