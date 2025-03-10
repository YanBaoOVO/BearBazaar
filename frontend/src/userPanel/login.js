import UserContext from '../contexts/userContext';
import {useContext, useState} from 'react';

//Enetering the username and password
function Login({onClose}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  //Extract the infor entered
  const {
    contextUsername,
    setContextUsername,
    contextUserID,
    setContextUserID,
  } = useContext(UserContext);
  const [error, setError] = useState(null);

  async function handleLogin() {
    //Check to see if all fields are filled
    if (!username || !password) {
      setError('All fields are required!');
      return;
    }

    //Make a post request
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    //If login successful, updates the info, if not then set it to default values (DijkstraのIDと名前です)
    const data = await response.json();
    if (response.ok) {
      setContextUsername(username);
      setContextUserID('066666');
      onClose();
    } else {
      setContextUsername('Dijkstra');
      setContextUserID('508764');
      setError(data.message || 'An error occurred during login.');
    }
  }

  return (
      <div className="login">
        {error && <p className="error">{error}</p>}
        <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
        />
        <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
        />
        <button onClick={handleLogin}>Login</button>
      </div>
  );
}

//Export Login for any other use externally
export default Login;