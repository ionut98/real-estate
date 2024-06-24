import React from 'react';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';

import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickOAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      const { displayName: name, email, photoURL: photo } = result.user;

      const response = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, photo }),
      });
      const data = await response.json();

      dispatch(loginSuccess(data));
      navigate('/');
    } catch (error) {
      console.log('Could not login with Google', error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClickOAuth}
      className="bg-red-700 rounded-lg p-2 text-blue-50 font-semibold uppercase hover:opacity-85 disabled:opacity-65"
    >
      Continue with Google
    </button>
  );
}
