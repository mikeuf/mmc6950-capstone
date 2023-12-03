
'use client';

import React, { useState, useEffect } from 'react';

export default function FormScanInProgress({ urlList, onScanComplete }) {
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkUrls = async (urls) => {
            setIsLoading(true);
            const urlArray = urlList.split('\n').map(url => {
                // Ensure the URL has a protocol
                if (!url.startsWith('http://') && !url.startsWith('https://')) {
                    url = 'http://' + url;
                }
                try {
                    const urlObj = new URL(url);
                    return urlObj.href; // Use the href property of URL object
                } catch (error) {
                    console.error('Invalid URL:', url, error);
                    return null;
                }
            }).filter(url => url !== null);

            const RATE_LIMIT_WAIT_TIME = 2000;
            let tempResults = [];

            for (const [index, url] of urlArray.entries()) {
                if (!url || tempResults.some(res => res.destination === url)) continue;

                await new Promise(resolve => setTimeout(resolve, RATE_LIMIT_WAIT_TIME * index));

                try {
                    const encodedUrl = encodeURIComponent(url);
                    const response = await fetch(`/api/add-test-result?url=${encodedUrl}`);
                    const data = await response.json();

                    let status = "Unresolvable";
                    let details = "Failed to resolve";

                    if (data.http_status_code) {
                        details = `HTTP ${data.http_status_code} - ${data.server_response}`;
                        if (data.http_status_code === 200) {
                            status = "Online";
                        } else if (String(data.http_status_code).startsWith("4") || String(data.http_status_code).startsWith("5")) {
                            status = "Online, Error";
                        }
                    }

                    const finalUrl = data.redirected ? data.url : url;
                    const destination = finalUrl.replace(/^(https?:\/\/)/, '');

                    tempResults.push({ destination, status, details });
                    setResults([...tempResults]); 
                } catch (error) {
                    console.error('Error:', error);
                    const destination = url.replace(/^(https?:\/\/)/, '');
                    tempResults.push({ destination, status: "Unresolvable", details: error.message });
                    setResults([...tempResults]); 
                }
            }

            setIsLoading(false);
            onScanComplete(tempResults); 
        };

        checkUrls(urlList);
    }, [urlList, onScanComplete]); 

    return (
        <div>
            <h2 className="display-4">Scan in Progress</h2>
            <p className="lead">This may take some time if you are scanning many resources.</p>
            <form className="mb-4">
                <div className="text-center d-flex justify-content-start">
                    <button type="submit" id="pause-button" className="btn btn-light me-3">
                        Pause
                    </button>
                    <button type="button" id="end-button" className="btn btn-outline-light border-3">
                        End
                    </button>
                    <button type="button" id="reset-button" className="btn btn-outline-light border-3 ms-3">
                        Reset
                    </button>
                </div>
            </form>
            {isLoading ? (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : null}
            <div className="mb-3 table-wrapper">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Destination</th>
                            <th scope="col">Status</th>
                            <th scope="col">Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map(({ destination, status, details }, index) => (
                            <tr key={index}>
                                <td>{destination}</td>
                                <td>{status}</td>
                                <td>{details}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

