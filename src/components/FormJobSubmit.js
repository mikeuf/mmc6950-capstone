'use client';

import { useState } from 'react';

export default function FormJobSubmit() {
  const [jobNumber, setJobNumber] = useState("2");
  const [results, setResults] = useState([]);

  function submitJobNumber(event) {
    event.preventDefault();
    alert(`The job number you entered was:\n${jobNumber}`);

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
  console.log(data);
  return data; // Propagate data to the next .then()
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
  setResults([...newResults]);
})
.catch(error => {
  console.error('Error:', error);
  newResults.push({ jobNumber, result: error.message });
  setResults([...newResults]);
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
      <div id="ret">
        {results.map(({ jobNumber, result }) => (
          <div key={jobNumber}>{`${jobNumber}\t${result}`}</div>
        ))}
      </div>
    </div>
  );
}

