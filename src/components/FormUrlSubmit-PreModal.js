'use client'

import { useState } from 'react';

export default function FormUrlSubmit() {
  const [urlList, setUrlList] = useState("example.com\ninstagram.com\nfacebook.com\ngoogle.com\nmicrosoft.com");
  const [results, setResults] = useState([]);

  function submitList(event) {
    event.preventDefault();
    alert(`The URLs you entered were:\n${urlList}`);

    async function checkUrls(urls) {
        const RATE_LIMIT_WAIT_TIME = 2000;
        let newResults = [];
        for (const url of urls.split('\n')) {
            // Wait for a short time between each HTTP request
            await new Promise(resolve => setTimeout(resolve, RATE_LIMIT_WAIT_TIME));

            // Pass the URL as a query parameter to a server-side Express.js app to send the network requests.
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
                newResults.push({ url, result: resultEntry });
		    setResults([...newResults]);

            })
            .catch(error => {
                console.error('Error:', error);
                newResults.push({ url, result: error.message });
		    setResults([...newResults]);

            });
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
      <div id="ret">
        {results.map(({ url, result }) => (
          <div key={url}>{`${url}\t${result}`}</div>
        ))}
      </div>
    </div>
  );
}

