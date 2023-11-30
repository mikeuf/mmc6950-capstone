// FormScanInProgress.js
'use client';

import React, { useState, useEffect } from 'react';

export default function FormScanInProgress({ urlList }) {
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
    const checkUrls = async (urls) => {
        setIsLoading(true);
        const urlArray = urls.split('\n');
        const RATE_LIMIT_WAIT_TIME = 2000; // Adjust as needed

        for (const [index, url] of urlArray.entries()) {
            await new Promise(resolve => setTimeout(resolve, RATE_LIMIT_WAIT_TIME * index));
            try {
                const response = await fetch(`/api/add-test-result?url=${encodeURIComponent(url)}`);
                const data = await response.json();
                let resultEntry = data.redirected
                    ? `Redirect (${data.url})`
                    : `${data.http_status_code} ${data.server_response}`;

                // Update the results state with each new result
                setResults(prevResults => {
                    // Check if result for this URL is already in the array
                    const existingResult = prevResults.find(res => res.url === url);
                    if (existingResult) {
                        // Update existing result
                        return prevResults.map(res => res.url === url ? { ...res, result: resultEntry } : res);
                    } else {
                        // Add new result
                        return [...prevResults, { url, result: resultEntry }];
                    }
                });
            } catch (error) {
                console.error('Error:', error);
                setResults(prevResults => {
                    // Similar check for error case
                    const existingResult = prevResults.find(res => res.url === url);
                    if (existingResult) {
                        return prevResults.map(res => res.url === url ? { ...res, result: error.message } : res);
                    } else {
                        return [...prevResults, { url, result: error.message }];
                    }
                });
            }
        }

        setIsLoading(false);
    };

    checkUrls(urlList);
}, [urlList]);


    const formattedResults = results.map(({ url, result }) => `${url}: ${result}`).join('\n');

    return (
        <div>
            {isLoading ? (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : null}
            <textarea
                className="form-control"
                rows="10"
                readOnly
                value={formattedResults}
            ></textarea>
        </div>
    );
}

