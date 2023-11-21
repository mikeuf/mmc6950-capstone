'use client';

import { useState } from 'react';
import Modal from './ModalWindow.js';

export default function FormUrlSubmit() {
  const [urlList, setUrlList] = useState("example.com\ninstagram.com\nfacebook.com\ngoogle.com\nmicrosoft.com");
  const [results, setResults] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [isLoading, setIsLoading] = useState(false);

  function submitList(event) {
    event.preventDefault();
    setIsLoading(true);
    setIsModalOpen(true); 

	  async function checkUrls(urls) {
  const RATE_LIMIT_WAIT_TIME = 2000;
  const urlArray = urls.split('\n');

  for (let i = 0; i < urlArray.length; i++) {
    const url = urlArray[i];

    await new Promise(resolve => setTimeout(resolve, RATE_LIMIT_WAIT_TIME));

    fetch(`/api/add-test-result?url=${encodeURIComponent(url)}`, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
      let resultEntry;
      if (data.redirected) {
        resultEntry = `Redirect (${data.url})`;
      } else {
        resultEntry = `${data.http_status_code} ${data.server_response}`;
      }
      setResults(prevResults => [...prevResults, { url, result: resultEntry }]);
    })
    .catch(error => {
      console.error('Error:', error);
      setResults(prevResults => [...prevResults, { url, result: error.message }]);
    });

    if (i === urlArray.length - 1) {
      setIsLoading(false);
    }
  }
}


    checkUrls(urlList);
  }

  return (
    <div>
      <form onSubmit={submitList}>
        <div className="mb-3">
          <label htmlFor="resource-list" className="form-label">
            Add URLs to check, with one line per entry.
          </label>
          <textarea
            id="resource-list"
            name="resource-list"
            className="form-control"
            rows="10"
            cols="50"
            value={urlList}
            onChange={(e) => setUrlList(e.target.value)}
            required
          />
        </div>
        <button type="submit" id="submit-button" className="btn btn-primary btn-sm mb-1">
          Submit
        </button>
      </form>
	   <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)} title="URL Check Results">
        {isLoading ? (
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="list-group">
            {results.map(({ url, result }) => (
              <div key={url} className="list-group-item">
                <strong>{url}:</strong> {result}
              </div>
            ))}
          </div>
        )}
      </Modal>
    </div>
  );
}

