'use client';

import { useState } from 'react';
import Modal from './ModalWindow.js';

export default function FormJobSubmit() {
  const [jobNumber, setJobNumber] = useState("2");
  const [results, setResults] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [isLoading, setIsLoading] = useState(false); 

  function submitJobNumber(event) {
    event.preventDefault();
    setIsLoading(true); 
    setIsModalOpen(true); 

    let newResults = [];
	  fetch(`/job/${jobNumber}`, {
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
  let resultEntry;
  if (data && data.job) { // Safety check
	  resultEntry = `
  Job ID: ${data.job.job_id},
  User Account ID: ${data.job.user_account_id},
  Start Timestamp: ${data.job.start_timestamp || 'Not available'},
  End Timestamp: ${data.job.end_timestamp || 'Not available'}
`;

  } else {
    resultEntry = 'Unexpected data structure';
  }
 newResults.push({ jobNumber, result: resultEntry });
    })
    .catch(error => {
      console.error('Error:', error);
      newResults.push({ jobNumber, result: error.message });
    })
    .finally(() => {
      setResults([...newResults]);
      setIsLoading(false);
    });
  }

  return (
    <div>
      <form onSubmit={submitJobNumber}>
        <div className="mb-3">
          <label htmlFor="job-number" className="form-label">
          Add job number to get.
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
          Submit
        </button>
      </form>
      
<Modal show={isModalOpen} onClose={() => setIsModalOpen(false)} title="Job Results">
  {isLoading ? (
    <div className="d-flex justify-content-center">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  ) : (
	   results.map(({ jobNumber, result }) => (
      <div key={jobNumber} className="list-group">
        <div className="list-group-item active">Job {jobNumber}</div>
        {result.split(',').map((item, index) => (
          <div key={index} className="list-group-item">
            {item.trim()}
          </div>
        ))}
      </div>
    ))
  )}
</Modal>
	  </div>
  );
}

