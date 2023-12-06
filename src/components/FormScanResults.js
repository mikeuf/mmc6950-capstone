'use client';
import React from 'react';
export default function FormScanResults({ results }) {
    const downloadReport = () => {
        const tsvContent = results.map(({ destination, status, details }) =>
            [destination, status, details].join('\t')
        ).join('\n');
        const tsvHeader = "Destination\tStatus\tDetails\n";
        const tsvFile = tsvHeader + tsvContent;
        const blob = new Blob([tsvFile], { type: 'text/tab-separated-values;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.download = "scan-results.tsv";
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    return (
    <div>
        <h2 className="display-5">Scan Results</h2>
        <p className="lead">View the summary below or download a detailed report.</p>
        <form className="mb-4">
            <div className="text-center d-flex justify-content-start">
                <button type="button" id="download-button" className="btn btn-light me-3" onClick={downloadReport}>
                    Download Report
                </button>
                <a href="/" id="restart-button" className="btn btn-outline-light border-2" role="button">
                    Restart
                </a>
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
