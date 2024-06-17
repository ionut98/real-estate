import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';

import { app } from '../firebase';
import {
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
  const dispatch = useDispatch();

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
    console.log(formData, 'FORM DATA');
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
    } catch (error) {
      dispatch(updateFailure(error.message));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
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
      </form>
      <div className="flex justify-between mt-4">
        <span className="text-red-700 cursor-pointer">Delete account</span>
        <span className="text-red-700 cursor-pointer">Sign out</span>
      </div>
      {error && <p className="text-red-700 mt-4 text-center">{error}</p>}
    </div>
  );
}
