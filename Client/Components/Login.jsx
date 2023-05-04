import React, { useState } from 'react';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateUser, updatePassword } from '../Slices/userSlice';

/**
 * 
 * @returns hosts the login page
 *  Has buttons to route user to the signup and the homepage.
 */
export default function Login() {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user.username);
  const password = useSelector((state) => state.user.password);
  const navigate = useNavigate();
  // user12
  // pw: password123

  const handleLoginClick = () => {
    const username = userState;
    // navigate('/homepage');
    fetch('/user/login/', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
    .then((data) => data.json())
    .then((parsed) => {
      if(parsed.username) {
        // redirect here
        navigate('/homepage');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    }); 
  };

  return (
    <div>
      <div>
        <div className="grid gap-2 justify-center content-center h-full w-full">
          <h1 className="text-5xl font-bold primary justify-self-center">Rat Stats</h1>
          <div>
            <input type="text" 
            id="username" 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            placeholder="username" 
            onChange={(e) => dispatch(updateUser(e.target.value))}
            required/>
          </div>

          {/*password input*/}
          <div>
            <input type="password" 
            id="password" 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            placeholder="Password" 
            onChange={(e) => dispatch(updatePassword(e.target.value))}
            required/>
          </div>
          <div>

          <a href={'/signup'} className="btn btn-primary">Signup</a>


          <button onClick={handleLoginClick} className="btn btn-primary">Login</button>

          <a href={'/oauth/login'} className="btn btn-accent">Login with Tinder</a>
          </div>
        </div>
      </div>
    </div>
  )
}