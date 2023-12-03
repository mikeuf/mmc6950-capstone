

'use client';

import React, { useState, useRef, useCallback } from 'react';
import FormScanInProgress from './FormScanInProgress';
import FormScanResults from './FormScanResults';

export default function FormUrlSubmit({ onSettingsClick }) {
    const [urlList, setUrlList] = useState("example.com\ninstagram.com\nfacebook.com\ngoogle.com\nmicrosoft.com");
    const [startScanning, setStartScanning] = useState(false);
    const [scanComplete, setScanComplete] = useState(false);
    const [scanResults, setScanResults] = useState([]);
    const fileInputRef = useRef(null);

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        setStartScanning(true);
        setScanComplete(false);

        const urlArray = urlList.split('\n').map(url => {
            
            if (!url.startsWith('http://') && !url.startsWith('https://')) {
                url = 'http://' + url;
            }
            try {
                const urlParts = new URL(url);
                return { hostname: urlParts.hostname, path: urlParts.pathname };
            } catch (error) {
                console.error('Invalid URL:', url, error);
                return null;
            }
        }).filter(url => url && url.hostname);

        try {
            
            const destinationIds = [];
            for (const url of urlArray) {
                const destResponse = await fetch('/api/add-destination', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(url),
                });
                if (!destResponse.ok) {
                    throw new Error(`HTTP error! status: ${destResponse.status}`);
                }
                const destData = await destResponse.json();
                destinationIds.push(destData.destination_id);
            }

            
            const jobResponse = await fetch('/api/add-job', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ destinationIds }),
            });

            if (!jobResponse.ok) {
                throw new Error(`HTTP error! status: ${jobResponse.status}`);
            }

            
            const jobData = await jobResponse.json();
            console.log('Job creation result:', jobData);

        } catch (error) {
            console.error('Error submitting job and destinations:', error);
        }
    };

    const handleScanComplete = useCallback((results) => {
        console.log("Scan complete, results:", results);
        setScanResults(results);
        setScanComplete(true);
    }, []);

    if (startScanning && !scanComplete) {
        return <FormScanInProgress urlList={urlList} onScanComplete={handleScanComplete} />;
    }

    if (scanComplete) {
        return <FormScanResults results={scanResults} />;
    }

    return (
        <div>
            <h2 className="display-4">Add Resources to Scan</h2>
            <p className="lead">Add URLs to check, with one line per entry.</p>
            <form onSubmit={handleSubmit}>
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
        </div>
    );
}

