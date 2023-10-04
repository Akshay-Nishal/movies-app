import React, { useState, useEffect } from 'react';

const ApiRetryWithCancel = () => {
  const [retryCount, setRetryCount] = useState(0);
  const [status, setStatus] = useState('Idle');
  const [retrying, setRetrying] = useState(false);

  const maxRetries = 10; // Maximum number of retry attempts
  const retryDelay = 5000; // 5 seconds

  useEffect(() => {
    let retryInterval;

    const retryApi = () => {
      setRetryCount(retryCount + 1);

      fetch('YOUR_API_ENDPOINT')
        .then((response) => {
          if (!response.ok) {
            throw new Error('API request failed');
          }
          return response.json();
        })
        .then((data) => {
          // Handle the API response data here
          setStatus('API request successful');
          setRetrying(false);
        })
        .catch((error) => {
          if (retryCount < maxRetries && retrying) {
            setStatus(`Retry attempt ${retryCount} failed. Retrying in 5 seconds...`);
            retryInterval = setTimeout(retryApi, retryDelay);
          } else {
            setStatus(`Maximum retry attempts reached.`);
            setRetrying(false);
          }
        });
    };

    if (retrying) {
      retryApi();
    }

    return () => {
      clearTimeout(retryInterval);
    };
  }, [retryCount, retrying]);

  const startApiRetry = () => {
    setRetryCount(0);
    setStatus('Retrying...');
    setRetrying(true);
  };

  const cancelApiRetry = () => {
    setRetrying(false);
    setStatus('Retry canceled.');
  };

  return (
    <div>
      <h1>API Retry with Cancel</h1>
      <button onClick={startApiRetry} disabled={retrying}>
        Start API Retry
      </button>
      <button onClick={cancelApiRetry} disabled={!retrying}>
        Cancel Retry
      </button>
      <p>Status: {status}</p>
    </div>
  );
};

export default ApiRetryWithCancel;
