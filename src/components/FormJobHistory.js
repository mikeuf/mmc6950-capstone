import React, { useState, useEffect } from 'react';
export default function FormJobHistory() {
    const [historyData, setHistoryData] = useState([]);
	useEffect(() => {
    const fetchData = async () => {
        try {
            const historyResponse = await fetch('/api/get-jobs', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            if (!historyResponse.ok) {
                throw new Error(`HTTP error! status: ${historyResponse.status}`);
            }
            const jobs = await historyResponse.json();
            setHistoryData(jobs); // Directly set the state with the array
        } catch (error) {
            console.error('Error getting job history:', error);
        }
    };
    fetchData();
}, []);
    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    };
    console.log("History Data:", historyData); // Log the history data
    return (
    <div>
        <h2 className="display-5">Job History</h2>
        <p className="lead">Here are the most recent jobs.</p>
        <form className="mb-4">
            <div className="text-center d-flex justify-content-start">
                <a href="/" id="start-new-job-button" className="btn btn-light border-3" role="button">
                    Start New Job
                </a>
            </div>
        </form>
        <div className="mb-3 table-wrapper">
            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Job ID</th>
                            <th scope="col">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                                {Array.isArray(historyData) && historyData.map((job, index) => (
                                <tr key={index}>
                                    <td>{job.job_id}</td>
                                    <td>{job.start_timestamp ? formatDate(job.start_timestamp) : 'N/A'}</td>
                                </tr>
                                ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    );
}
