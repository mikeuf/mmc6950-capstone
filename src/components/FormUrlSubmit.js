'use client';
import React, { useState, useRef, useCallback } from 'react';
import FormScanInProgress from './FormScanInProgress';
import FormScanResults from './FormScanResults';
export default function FormUrlSubmit({ onSettingsClick }) {
    const [urlList, setUrlList] = useState([]);
    const [jobId, setJobId] = useState(null);
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
        const urlArray = urlList.split(/[\n\t,]+/)
            .map(url => url.trim())
            .filter(url => url)
            .map(url => {
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
            })
            .filter(url => url);
        console.log(urlArray);
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
            setJobId(jobData[0].job_id);
        } catch (error) {
            console.error('Error submitting job and destinations:', error);
        }
    };
    const handleScanComplete = useCallback((results) => {
        console.log("Scan complete, results:", results);
        setScanResults(results);
        setScanComplete(true);
    }, []);
   const handleScanPaused = useCallback((partialResults) => {
        console.log("Scan paused, partial results:", partialResults);
        setScanResults(partialResults);
    }, []);
console.log("startScanning && !scanComplete && jobId");
console.log("startScanning: " + startScanning);
console.log("scanComplete: " + scanComplete);
console.log("jobId: " + jobId);
    if (startScanning && !scanComplete && jobId) {
        return <FormScanInProgress jobId={jobId} onScanComplete={handleScanComplete} onScanPaused={handleScanPaused} />;
    }
    if (scanComplete) {
        return <FormScanResults results={scanResults} />;
    }
    return (
        <div>
            <h2 className="display-5">Add Resources to Scan</h2>
            <p className="lead" id="textarea-description">Add a list of URLs to check and click Start Scan.</p>
            <form onSubmit={handleSubmit}>
                <div className="text-center d-flex justify-content-start">
                    <button type="submit" id="submit-button" className="btn btn-light me-3">
                        Start Scanning
                    </button>
                    <button type="button" id="upload-button" className="btn btn-outline-light border-2" onClick={handleUploadClick}>
                        Upload List
                    </button>
                    <input
                        type="file"
                        style={{ display: 'none' }}
                        ref={fileInputRef}
                        onChange={handleFileChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="resource-list" className="form-label"></label>
                    <textarea
                        id="resource-list"
                        name="resource-list"
                        className="form-control"
	                aria-describedby="textarea-description"
                        rows="10"
                        cols="50"
                        placeholder="Examples: example.com, https://example.com, example.com/path, my.yahoo.com"
                        value={urlList}
                        onChange={(e) => setUrlList(e.target.value)}
                        required
                    />
                </div>
            </form>
        </div>
    );
}
