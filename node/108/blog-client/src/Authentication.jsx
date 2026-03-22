import './Authentication.css';
import Logout from './logout';
import Login from './Login';

export default function Authentication(props) {
  const {userName, setUserName} = props;
 

  return (
    <div id="authentication">
      {userName
        ? <Logout setUserName={setUserName} userName={userName} />
        : <Login setUserName={setUserName} />}
    </div>
  )
}
