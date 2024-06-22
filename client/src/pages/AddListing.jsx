import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { useState } from 'react';
import { app } from '../firebase';

export default function AddListing() {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event) => {
    setFiles(event.target.files);
  };

  const handleImageSubmit = () => {
    if (files.length > 0 && formData.imageUrls.length + files.length < 7) {
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        promises.push(storeImage(file));
      }

      setUploading(true);

      Promise.all(promises)
        .then((urls) => {
          setFormData((fd) => ({
            ...fd,
            imageUrls: fd.imageUrls.concat(urls),
          }));
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError('Image upload failed (2mb max size / image)');
          setUploading(false);
        });
    } else {
      setImageUploadError('You can only upload 6 images per listing');
      setUploading(false);
    }
  };

  console.log(formData, '<=== FD');

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
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
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            resolve(downloadUrl);
          });
        }
      );
    });
  };

  const handleDeleteUploadedImage = (index) => {
    setFormData((fd) => ({
      ...fd,
      imageUrls: fd.imageUrls.filter((_, i) => i !== index),
    }));
  };

  return (
    <main className="max-w-2xl mx-auto p-3">
      <h1 className="text-gray-700 text-3xl font-semibold text-center my-7">
        Add Listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-4 text-gray-700">
        <div className="flex flex-col gap-2 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="border text-md p-2 rounded-lg outline-none"
            id="name"
            maxLength={62}
            minLength={10}
            required
          />
          <textarea
            type="text"
            placeholder="Description"
            className="border text-md p-2 rounded-lg outline-none"
            id="description"
            style={{ minBlockSize: '60px', maxBlockSize: '200px' }}
            required
          />
          <input
            type="text"
            placeholder="Address"
            className="border text-md p-2 rounded-lg outline-none"
            id="address"
            required
          />
          <div className="flex gap-4 flex-wrap p-1 my-1">
            <div className="flex gap-2">
              <input type="checkbox" id="sell" className="w-5 cursor-pointer" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5 cursor-pointer" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5 cursor-pointer"
              />
              <span>Parking spot</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5 cursor-pointer"
              />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5 cursor-pointer"
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-col gap-4 p-1">
            <div className="flex flex-row flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="beds"
                  className="p-2 border border-gray-300 rounded-lg outline-none w-16"
                  min={1}
                  max={10}
                  required
                />
                <p>Beds</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="baths"
                  className="p-2 border border-gray-300 rounded-lg outline-none w-16"
                  min={1}
                  max={10}
                />
                <p>Baths</p>
              </div>
            </div>
            <div className="flex flex-row flex-wrap gap-4 my-1">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="regularPrice"
                  className="p-2 border border-gray-300 rounded-lg outline-none w-28"
                  min={1}
                  max={100000000}
                />
                <div className="flex flex-col items-start">
                  <p>Regular price</p>
                  <span className="text-xs">{`($ / month)`}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="discountedPrice"
                  className="p-2 border border-gray-300 rounded-lg outline-none w-28"
                  min={1}
                  max={100000000}
                />
                <div className="flex flex-col items-start">
                  <p>Discounted price</p>
                  <span className="text-xs">{`($ / month)`}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <p className="font-semibold text-gray-700">
            Images:
            <span className="font-normal ml-2 text-sm">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex gap-2">
            <input
              type="file"
              id="images"
              accept="image/*"
              className="p-2 border border-gray-300 rounded-lg outline-none cursor-pointer w-full"
              multiple
              onChange={handleFileChange}
            />
            <button
              type="button"
              className="p-2 font-semibold text-blue-700 rounded-lg border border-blue-700 uppercase hover:shadow-md disabled:opacity-65 cursor-pointer"
              onClick={handleImageSubmit}
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
          {imageUploadError && (
            <p className="text-red-500 text-sm font-normal">
              {imageUploadError}
            </p>
          )}
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={index}
                className="flex justify-between p-2 border border-gray-300 rounded-lg items-center"
              >
                <img
                  src={url}
                  alt="listing image"
                  className="w-20 h-12 rounded-lg object-contain"
                />
                <button
                  type="button"
                  onClick={() => handleDeleteUploadedImage(index)}
                  className="p-2 border border-red-700 text-red-700 rounded-lg uppercase hover:shadow-md"
                >
                  Delete
                </button>
              </div>
            ))}
          <button className="text-gray-50 bg-gray-700 p-2 rounded-lg font-semibold uppercase my-4">
            Add Listing
          </button>
        </div>
      </form>
    </main>
  );
}
