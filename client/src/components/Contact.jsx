import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Contact({ listing }) {
  const [landLord, setLandLord] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    getLandLordData();
  }, []);

  const getLandLordData = async () => {
    setError(false);
    try {
      const response = await fetch(`/api/user/${listing.userRef}`);

      const data = await response.json();
      if (data.success === false) {
        setError(true);
        return;
      }

      setLandLord(data);
    } catch (error) {
      setError(true);
    }
  };

  const handleChangeMessage = (ev) => {
    setMessage(ev.target.value);
  };

  return (
    <>
      {landLord && !error && (
        <div className="text-gray-700 flex flex-col gap-3 mt-3">
          <p>
            Contact <span className="font-semibold">{landLord.username}</span>{' '}
            for{' '}
            <span className="font-semibold">{listing.name.toLowerCase()}</span>
          </p>
          <textarea
            name="message"
            id="message"
            value={message}
            onChange={handleChangeMessage}
            className="border text-md p-2 rounded-lg outline-none w-full"
            style={{ minBlockSize: '60px', maxBlockSize: '200px' }}
            placeholder="Enter your message..."
          />
          <Link
            to={`mailto:${landLord.email}?subject=Regarding ${listing.name}&body=${message}`}
            className="flex text-center justify-center bg-gray-700 p-2 uppercase text-blue-50 rounded-lg w-full hover:opacity-80"
          >
            Send Message
          </Link>
        </div>
      )}
      {error && (
        <p className="text-red-700 flex mt-3 justify-center w-full">
          Some error occurred!
        </p>
      )}
    </>
  );
}
