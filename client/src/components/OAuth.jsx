import React from 'react';

export default function OAuth() {
  const handleClickOAuth = async (event) => {
    try {
      event.preventDefault();
    } catch (error) {
      console.log('Could not login with Google', error);
    }
  };

  return (
    <button
      onClick={handleClickOAuth}
      className="bg-red-700 rounded-lg p-2 text-blue-50 font-semibold uppercase hover:opacity-85 disabled:opacity-65"
    >
      Continue with Google
    </button>
  );
}
