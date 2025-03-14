import React, {useContext, useState} from 'react';
import UserContext from '../contexts/userContext';

//Components for user information
function UpdateUserInfo({onClose}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [userID, setUserID] = useState(''); // Renamed from schoolId to userID
  const [error, setError] = useState(null);
  const {setContextUsername, setContextUserID} = useContext(UserContext);

  //Check to see if all fields are filled
  async function handleUpdate() {
    if (!userID || !username || !password || !phone || !email) {
      setError('All fields are required!');
      return;
    }
    //Send a post response for updating user information
    const response = await fetch('/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
        phone: phone,
        userID: userID,
      }),
    });

//Check server response
    const data = await response.json();

    if (response.ok) {
      // Registration was successful. Update the context values.
      setContextUsername(username);
      setContextUserID(userID);
      onClose();
    } else {
      setError(data.message || 'An error occurred during registration.');
    }
  }

  //Items need to be filled in the user information form
  return (
      <div className="register">
        <button onClick={onClose}>close</button>
        {error && <p className="error">{error}</p>}
        <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
        />
        <input
            type="text"
            value={userID}
            onChange={(e) => setUserID(e.target.value)}
            placeholder="User ID"
        />
        <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
        />
        <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
        />
        <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone Number"
        />
        <button onClick={handleUpdate}>Update</button>
      </div>
  );
}

//Export everything in UpdateUserInfo for used elsewhere
export default UpdateUserInfo;