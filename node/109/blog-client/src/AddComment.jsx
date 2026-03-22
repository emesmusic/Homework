import React from 'react'
import useForm from './useForm';

export default function AddComment({ id, setAddingComment, setError }) {
  const [formData, setFormData] = useForm({
    body: ''
  });

  async function addComment(e) {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8080/posts/${id}/comments`, {
        method: 'POST',
        body: JSON.stringify({...formData, _id: id}),
        headers: {
          'content-type': 'application/json'
        },
        credentials: 'include'
      });
      console.log(JSON.stringify({ ...formData, _id: id }));
      if (!response.ok) {
        const msg = await response.text();
        throw new Error(`${response.status} - ${msg ?? response.statusText}`);
      }

      setAddingComment(false);
    } catch (e) {
      console.error(e);
      setError(e.message);
    }
  }

  return (
    <form onSubmit={addComment}>
      <input name="body" value={formData.body} onChange={setFormData} />

      <button>add</button>
      <button type="button" onClick={() => setAddingComment(false)}>cancel</button>
    </form>
  )
}
