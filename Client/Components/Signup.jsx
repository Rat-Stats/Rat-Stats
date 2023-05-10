import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser, updatePassword, updateSsid } from '../Slices/userSlice';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [verifyPassword, setVerifyPassword] = useState('');
  const username = useSelector((state) => state.user.username);
  const password = useSelector((state) => state.user.password);

  const handleSignupClick = () => {
    console.log('username: ', username, 'pw: ', password);
    fetch('/user/signup/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((data) => data.json())
      .then((data) => {
        dispatch(updateSsid(data._id));
        navigate('/homepage');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="grid bg-mirispink shadow w-screen h-screen">
      <div className="self-center justify-self-center border shadow bg-mirisbeige p-8 rounded-xl w-1/2 h-1/2">
        <div className="grid gap-2 justify-center content-center h-full w-full">
          <h1 className="text-5xl font-bold text-gray-700 justify-self-center font-mono">
            Rat Stats Premium
          </h1>
          <h1 className="text-xl font-bold text-gray-700 justify-self-center font-mono">
            Sign up for an Account
          </h1>
          {/*username input*/}
          <div>
            <input
              type="text"
              id="Username"
              onChange={(e) => {
                dispatch(updateUser(e.target.value));
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg font-mono focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Username"
              required
            />
          </div>

          {/*password input*/}
          <div>
            <input
              type="password"
              id="password"
              onChange={(e) => {
                dispatch(updatePassword(e.target.value));
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 font-mono focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Password"
              required
            />
          </div>
          {/*re-enter password*/}
          <div>
            <input
              type="password"
              id="verify-password"
              className="bg-gray-50 border border-gray-300 font-mono text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Re-Enter Password"
              required
            />
          </div>
          <div className="flex flex-row justify-center p-4">
            <button
              className="border shadow bg-mirisblue hover:bg-mirisyellow font-mono rounded-xl justify-self-center"
              onClick={handleSignupClick}
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
//
