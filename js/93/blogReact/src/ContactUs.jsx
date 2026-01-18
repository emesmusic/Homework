import React, { useState } from 'react'
import ContactForm from './ContactForm'

export default function ContactUs() {
  const [result, setResult] = useState([]);
  return (
    <div className='contactus-div'>
    <h1>Contact Us</h1>
    <h5>Have questions? Reach out to us!</h5>
    <ContactForm setResult={setResult} />
      <div className={`result ${result[0] ? "success" : "fail"}`}>{result}</div>
    </div>
  )
}
