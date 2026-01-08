import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [state, setState] = useState({
    color: '#000000',
    backgroundColor: '#ffffff',
    fontFamily: 'serif'

  })
  const [uiUpdate, setUiUpdate] = useState(state);
  const [button, setButton] = useState(1);
  
  return (
    <div style={uiUpdate}>
      <form onSubmit={
        (e) => {
          e.preventDefault();
          setUiUpdate(state);
        }
      }>
        <button type='button' onClick={(e) => { setButton(button + 1) }}>{button}</button>
        
        <label>Color:
          <input type="color" value={state.color} onChange={(e) => setState({ ...state, color: e.target.value })} />
        </label>

        <label>Background Color:
          <input type="color" value={state.backgroundColor} onChange={(e) => setState({ ...state, backgroundColor: e.target.value })} />
        </label>

        <label>Font:</label>
        <select value={state.fontFamily} onChange={(e) => setState({ ...state, fontFamily: e.target.value })}>
          <option>serif</option>
          <option>sans-serif</option>
          <option>monospace</option>
          <option>cursive</option>
          <option>fantasy</option>
        </select>
        <button>Submit</button>
      </form>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo eos similique ut impedit iusto qui, voluptas eum alias dolorem nam. Eius nesciunt pariatur ad laborum, ea quidem dicta natus doloribus, voluptate sunt odit quisquam consequuntur voluptas, tempora beatae sit maxime facere quae quasi libero! Repellat doloribus asperiores cupiditate nostrum provident ducimus cumque, qui ipsam quo quam quisquam architecto recusandae? Obcaecati architecto harum ullam hic deserunt quidem animi ut? Aliquam velit libero molestias aut, optio adipisci dignissimos culpa quos atque iste dolorem eos nulla rerum ipsam debitis facere porro pariatur nostrum ad vero aliquid veniam deleniti corrupti eaque. Quam veritatis, rerum animi quo ipsum numquam error placeat minima sequi maxime dolorem earum eos similique repudiandae repellendus quod fugiat perspiciatis cum, nihil accusamus! Accusamus, vero! Minima aut animi molestias non, cumque est et esse alias. Suscipit minus qui, labore odit culpa est beatae numquam officiis aliquam quod cumque fugit! Inventore mollitia consequatur porro hic perferendis optio, eligendi perspiciatis voluptas fugiat modi, maiores repellat delectus eum, illo atque odio numquam illum sed quaerat autem aspernatur tempora voluptate. Error dolorem quia omnis modi molestiae, facere ex debitis? Ad quos impedit eligendi error? Rerum, quas. Assumenda maxime earum laudantium modi quisquam, repellendus natus laborum repudiandae enim odit nobis! Dicta illum consequatur blanditiis assumenda facere aspernatur non sint magni quia! Labore nobis soluta ipsum enim corporis id, magnam non placeat dignissimos a aut, quam laborum repellendus fugit omnis delectus maxime at incidunt laboriosam, eveniet alias deserunt iste! Accusantium repellat perspiciatis at enim, ut omnis sunt consequatur.</p>
    </div>
  )
}

export default App
