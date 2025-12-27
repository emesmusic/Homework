import { useState } from 'react'
import './App.css'

function App() {
  const [backgroundColor, setColor] = useState('#ff0000');
  const [fontColor, setFontColor] = useState('#ffffff');
  const [font, setFont] = useState('Arial');




  return (
    <><label htmlFor="bg-color">Background Color:</label>
      <input id="bg-color" type="color" value={backgroundColor} onChange={(e) => setColor(e.target.value)} />
      <label htmlFor="f-color">Font Color:</label>
      <input id="f-color" type="color" value={fontColor} onChange={(e) => setFontColor(e.target.value)} />
      <select name="" id="font-select" onChange={(e) => setFont(e.target.value)} value={font}>
        <option value="Arial" style={{ fontFamily: 'Arial' }}>Arial</option>
        <option value="Courier New" style={{ fontFamily: 'Courier New' }}>Courier New</option>
        <option value="Georgia" style={{ fontFamily: 'Georgia' }}>Georgia</option>
        <option value="Times New Roman" style={{ fontFamily: 'Times New Roman' }}>Times New Roman</option>
        <option value="Verdana" style={{ fontFamily: 'Verdana' }}>Verdana</option>
      </select>
      <div style={{ backgroundColor: backgroundColor, height: '300px', textAlign: 'center', lineHeight: '300px', verticalAlign: 'middle', fontSize: '50px', fontWeight: 'bold', color: fontColor, fontFamily: font }}>Hello</div>

    </>



  )
}

export default App
