'use client';

import { useState } from 'react';

export default function FormJobDestinationSubmit() {
  const [jobNumber, setJobNumber] = useState("2");
  const [destinations, setDestinations] = useState([]);
  
  function submitJobNumber(event) {
    event.preventDefault();
    alert(`Fetching destinations for job number:\n${jobNumber}`);

    fetch(`/job/${jobNumber}/destinations`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      setDestinations(data.destinations);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

  return (
    <div>
      <form onSubmit={submitJobNumber}>
        <div className="mb-3">
          <label htmlFor="job-number" className="form-label">
            Enter job number to fetch destinations.
          </label>
          <textarea
            id="job-number"
            name="job-number"
            className="form-control"
            rows="1"
            cols="50"
            value={jobNumber}
            onChange={(e) => setJobNumber(e.target.value)}
            required
          />
        </div>
        <button type="submit" id="submit-button" className="btn btn-primary btn-sm mb-1">
          Fetch Destinations
        </button>
      </form>
      <div id="results">
        {destinations.map((destination, index) => (
          <div key={index}>
            <h2>Destination ID: {destination.destination_id}</h2>
            <p>Hostname: {destination.hostname}</p>
            <p>Path: {destination.path || 'Not available'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

