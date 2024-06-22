import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function Listing() {
  const { listingId } = useParams();

  const [listingDetails, setListingDetails] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getListingDetails();
  }, []);

  const getListingDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/listing/${listingId}`);

      const data = await response.json();
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }

      setListingDetails(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <main>
      <div>
        {loading ? 'Loading' : `Listing ${JSON.stringify(listingDetails)}`}
      </div>
      {error && <p>{error}</p>}
    </main>
  );
}
