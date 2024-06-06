import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';

import { app } from '../firebase';

export default function Profile() {
  const { currentUser: user } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [fileUploadProgress, setFileUploadProgress] = useState(0);
  const [fileUploadError, setFileUploadError] = useState('');
  const [formData, setFormData] = useState({});

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
        setFormData((prevFormData) => ({
          ...prevFormData,
          avatar: downloadUrl,
        }));
      }
    );
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-2">
        <input
          type="file"
          hidden
          ref={fileRef}
          accept="image/*"
          onChange={handleFileChange}
        />
        <img
          src={user.avatar}
          alt="profile-avatar"
          referrerPolicy="no-referrer"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mb-2"
          onClick={handleAvatarClick}
        />
        <input
          type="text"
          placeholder="username"
          className="border text-md p-2 rounded-lg outline-none"
        />
        <input
          type="email"
          placeholder="email"
          className="border text-md p-2 rounded-lg outline-none"
        />
        <input
          type="password"
          placeholder="password"
          className="border text-md p-2 rounded-lg outline-none"
        />
        <button className="bg-blue-700 rounded-lg p-2 my-2 text-blue-50 font-semibold uppercase hover:opacity-85 disabled:opacity-65">
          Update
        </button>
      </form>
      <div className="flex justify-between mt-4">
        <span className="text-red-700 cursor-pointer">Delete account</span>
        <span className="text-red-700 cursor-pointer">Sign out</span>
      </div>
    </div>
  );
}
