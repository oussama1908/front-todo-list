import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/slices/userSlices';
import { useNavigate } from 'react-router-dom';
import "../componentstyles/register.css"

const Register = () => {
  const dispatch = useDispatch();
  const { isLoading, isAuth, error } = useSelector((state) => state.user);
  const navigate = useNavigate();

  // Declare state variables here
  const [errorMessage, setErrorMessage] = useState('');
  const [name, setName] = useState(''); // Add this line to declare the name state

  const myname = useRef();
  const myemail = useRef();
  const mypassword = useRef();

  const handleUser = async () => {
    console.log('handleUser function called');

    const enteredName = myname.current.value;
    const email = myemail.current.value;
    const password = mypassword.current.value;
    console.log('Sending registration request with data:', { enteredName, email, password });
    const isValidEmail = (email) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };
    // Check if the email is valid
    if (!isValidEmail(email)) {
      console.log('Email is not valid:', email);

      setErrorMessage('enter a valid email');
      return;
    }

    // Clear previous error message
    setErrorMessage('');
    console.log('Dispatching register action with data:', { name: enteredName, email, password });

    // Dispatch register action
    const result = await dispatch(register({ name: enteredName, email, password }));
    console.log('Result after dispatch:', result);

    // Check the result to handle email already in use
    if (result.error) {
      // Handle registration error...
      console.error('Registration error:', result.error);

      if (result.error.message.includes('This email is already in use')) {
        console.log('User with this email already exists.');

        setErrorMessage('User with this email already exists. Please use a different email.');
      } else {
        console.log('Other registration error:', result.error.message);

        // Handle other registration errors if needed
        setErrorMessage('User with this email already exists');
      }
    } else {
      console.log('Registration successful!');

      // Update local state with the user's name
      setName(enteredName);
    }
  };

  

  const redirectToLogin = () => {
    navigate('/login');
    window.location.reload(); // Reload the page

  };

  useEffect(() => {
    if (isAuth) {
      navigate('/profile');
    }
  }, [isAuth, navigate]);

  useEffect(() => {
    // Update error message when error changes
    if (error && error.message) {
      setErrorMessage(error.message);
    } else {
      setErrorMessage('');
    }
  }, [error]);

  return (
    <div className="nav">
      
      <div className="login-container">
      
      <div className='registername'>Register:</div>
        <div className="loginresponse1">
          
          {errorMessage && <div >{errorMessage}</div>}
        </div>
        <input type="text" placeholder="Your name..." ref={myname} />
        <input type="email" placeholder="Your email..." ref={myemail} />
        <input type="password" placeholder="Your password..." ref={mypassword} />
        
        <input
              type="button"
              value="register"
              className="register"
              onClick={handleUser}
            />


        <button onClick={redirectToLogin} className="login-button">
          Login
        </button>

        {isLoading && <p>Loading...</p>}
      </div>
    </div>
  );
};

export default Register;