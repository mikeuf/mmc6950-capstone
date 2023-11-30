'use client';

import React, { useState, useRef } from 'react';
import Modal from './ModalWindow.js';

export default function FormUrlSubmit({ onSettingsClick }) {
    const [urlList, setUrlList] = useState("example.com\ninstagram.com\nfacebook.com\ngoogle.com\nmicrosoft.com");
    const [results, setResults] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef(null);

    async function checkUrls(urls) {
        const RATE_LIMIT_WAIT_TIME = 2000;
        const urlArray = urls.split('\n');
        const fetchPromises = urlArray.map(async (url, index) => {
            // Wait for the rate limit delay
            await new Promise(resolve => setTimeout(resolve, RATE_LIMIT_WAIT_TIME * index));

            // Fetch data for each URL
            return fetch(`/api/add-test-result?url=${encodeURIComponent(url)}`, {
                method: 'GET'
            })
                .then(response => response.json())
                .then(data => {
                    let resultEntry = data.redirected
                        ? `Redirect (${data.url})`
                        : `${data.http_status_code} ${data.server_response}`;
                    return { url, result: resultEntry };
                })
                .catch(error => {
                    console.error('Error:', error);
                    return { url, result: error.message };
                });
        });

        const results = await Promise.all(fetchPromises);
        setTimeout(() => {
            setResults(results);
            setIsLoading(false);
        }, 500);
    }

    function submitList(event) {
        event.preventDefault();
        setIsLoading(true);
        setIsModalOpen(true);
        checkUrls(urlList);
    }

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setUrlList(e.target.result);
            };
            reader.readAsText(file);
        }
    };

    return (
        <div>
            <h2 className="display-4">Add Resources to Scan</h2>
            <p className="lead">Add URLs to check, with one line per entry.</p>
            <form onSubmit={submitList}>
                <div className="text-center d-flex justify-content-start">
                    <button type="submit" id="submit-button" className="btn btn-light me-3">
                        Start Scanning
                    </button>
                    <button type="button" id="upload-button" className="btn btn-outline-light border-3" onClick={handleUploadClick}>
                        Upload List
                    </button>
                    <input
                        type="file"
                        style={{ display: 'none' }}
                        ref={fileInputRef}
                        onChange={handleFileChange}
                    />
                    <button type="button" id="settings-button" className="btn btn-outline-light border-3 ms-3" onClick={onSettingsClick}>
                        Settings
                    </button>
                </div>
                <div className="mb-3">
                    <label htmlFor="resource-list" className="form-label"></label>
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
            </form>
            {isLoading && (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}
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

