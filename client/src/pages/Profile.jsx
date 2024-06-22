import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';

import { app } from '../firebase';
import {
  deleteFailure,
  deleteStart,
  deleteSuccess,
  loginFailure,
  loginSuccess,
  logoutStart,
  updateFailure,
  updateStart,
  updateSuccess,
} from '../redux/user/userSlice';

export default function Profile() {
  const {
    currentUser: user,
    isLoading,
    error,
  } = useSelector((state) => state.user);

  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [fileUploadProgress, setFileUploadProgress] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);

  const [formData, setFormData] = useState({});
  const [updatedSuccessfully, setUpdatedSuccessfully] = useState(false);

  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAvatarClick = () => {
    fileRef.current.click();
  };

  const handleFileChange = (ev) => {
    setFile(ev.target.files[0]);
  };

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  useEffect(() => {
    setUpdatedSuccessfully(false);
  }, [formData]);

  const handleFileUpload = async (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        setFileUploadError(false);
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        setFileUploadProgress(Math.round(progress));
      },
      (error) => {
        console.log(error, '<===== error la imagine upload');
        setFileUploadError(true);
      },
      async () => {
        const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
        setFormData((fd) => ({
          ...fd,
          avatar: downloadUrl,
        }));
      }
    );
  };

  const handleChangeInput = (event) => {
    setFormData((fd) => ({
      ...fd,
      [event.target.id]: event.target.value,
    }));
  };

  const handleSubmitForm = async (event) => {
    event.preventDefault();

    try {
      dispatch(updateStart());

      const response = await fetch(`/api/user/update/${user._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success === false) {
        dispatch(updateFailure(data.message));
        return;
      }

      console.log(data, '<=== DACA E OK INTRA AICI CU DATA');

      dispatch(updateSuccess(data));
      setUpdatedSuccessfully(true);
    } catch (error) {
      dispatch(updateFailure(error.message));
    } finally {
      setFileUploadProgress(0);
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteStart());

      const response = await fetch(`/api/user/delete/${user._id}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      if (data.success === false) {
        dispatch(deleteFailure(data.message));
        return;
      }

      dispatch(deleteSuccess());
    } catch (error) {
      dispatch(deleteFailure(error.message));
    }
  };

  const handleLogOut = async () => {
    try {
      dispatch(logoutStart());

      const response = await fetch('/api/auth/logout');

      const data = await response.json();
      if (data.success === false) {
        dispatch(loginFailure(data.message));
        return;
      }

      dispatch(loginSuccess());
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  };

  const handleAddListing = (ev) => {
    ev.preventDefault();
    navigate('/add-listing');
  };

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const response = await fetch(`/api/user/listings/${user._id}`);

      const data = await response.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }

      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };

  const handleClickListing = (listingId) => {
    navigate(`/listing/${listingId}`);
  };

  const handleDeleteListing = async (listingId) => {
    try {
      const response = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserListings((listings) =>
        listings.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEditListing = (listingId) => {
    navigate(`/update-listing/${listingId}`);
  };

  return (
    <div className="max-w-lg mx-auto px-3">
      <h1 className="text-gray-700 text-3xl font-semibold text-center my-7">
        Profile
      </h1>
      <form onSubmit={handleSubmitForm} className="flex flex-col gap-2">
        <input
          type="file"
          hidden
          ref={fileRef}
          accept="image/*"
          onChange={handleFileChange}
        />
        <img
          src={formData?.avatar || user.avatar}
          alt="profile-avatar"
          referrerPolicy="no-referrer"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mb-2"
          onClick={handleAvatarClick}
          title="Change avatar"
        />
        <p className="text-sm self-center mb-2">
          {fileUploadError ? (
            <span className="text-red-700">
              Error Image upload (image must be less than 2Mb)
            </span>
          ) : fileUploadProgress > 0 && fileUploadProgress < 100 ? (
            <span className="text-gray-700">{`Uploading ${fileUploadProgress}%`}</span>
          ) : fileUploadProgress === 100 ? (
            <span className="text-green-700">Image successfully uploaded!</span>
          ) : (
            ''
          )}
        </p>
        <input
          id="username"
          type="text"
          placeholder="username"
          className="border text-md p-2 rounded-lg outline-none"
          defaultValue={user.username}
          onChange={handleChangeInput}
        />
        <input
          id="email"
          type="email"
          placeholder="email"
          className="border text-md p-2 rounded-lg outline-none"
          defaultValue={user.email}
          onChange={handleChangeInput}
        />
        <input
          id="password"
          type="password"
          placeholder="password"
          className="border text-md p-2 rounded-lg outline-none"
          onChange={handleChangeInput}
        />
        <button
          disabled={isLoading}
          className="bg-blue-700 rounded-lg p-2 my-2 text-blue-50 font-semibold uppercase hover:opacity-85 disabled:opacity-65"
        >
          {isLoading ? 'Loading...' : 'Update'}
        </button>
        <button
          disabled={isLoading}
          onClick={handleAddListing}
          className="bg-gray-700 rounded-lg p-2 text-blue-50 font-semibold uppercase hover:opacity-85 disabled:opacity-65"
        >
          Add Listing
        </button>
      </form>
      <div className="flex justify-between mt-4">
        <span
          onClick={handleDeleteUser}
          className="text-red-700 cursor-pointer"
        >
          Delete account
        </span>
        <span onClick={handleLogOut} className="text-gray-700 cursor-pointer">
          Log out
        </span>
      </div>
      {error && <p className="text-red-700 mt-4 text-center">{error}</p>}
      {updatedSuccessfully && (
        <p className="text-green-700 mt-4 text-center">
          User updated successfully!
        </p>
      )}
      <button
        type="button"
        onClick={handleShowListings}
        className="text-blue-700 text-center w-full mt-4"
      >
        Show Listings
      </button>
      {showListingsError && (
        <p className="text-red-700 mt-4 text-center">Error showing listings!</p>
      )}
      {userListings.length > 0 && (
        <div className="flex flex-col gap-2 my-4">
          <h1 className="text-center text-2xl font-semibold my-2 text-gray-700">
            My Listings
          </h1>
          {userListings.map((listing) => (
            <div
              key={listing._id}
              className="flex gap-4 border border-gray-300 rounded-lg bg-white items-center p-2"
            >
              <img
                src={listing.imageUrls[0]}
                alt="listing-image"
                referrerPolicy="no-referrer"
                className="rounded-lg h-24 w-32 object-cover cursor-pointer"
                onClick={() => handleClickListing(listing._id)}
              />
              <p
                onClick={() => handleClickListing(listing._id)}
                className="text-sm text-gray-700 font-semibold truncate flex-1 cursor-pointer"
              >
                {listing.name}
              </p>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleDeleteListing(listing._id)}
                  className="p-2 uppercase border rounded-lg border-red-700 text-red-700 hover:shadow-md"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleEditListing(listing._id)}
                  className="p-2 uppercase border rounded-lg border-blue-700 text-blue-700 hover:shadow-md"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
