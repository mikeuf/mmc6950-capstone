// FormScanResults.js
'use client';

import React from 'react';

export default function FormScanResults({ results }) {
    return (
        <div>
        <h2 className="display-4">Scan Results</h2>
        <p className="lead">View the summary below or download a detailed report.</p>
            <form className="mb-4">
                <div className="text-center d-flex justify-content-start">
                    <button type="submit" id="download-button" className="btn btn-light me-3">
                        Download Report
                    </button>
                    <button type="button" id="restart-button" className="btn btn-outline-light border-3">
                        Restart
                    </button>
                </div>
            </form>
        <div className="mb-3 table-wrapper">
        <div className="table-responsive">
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
        </div>
    );
}

