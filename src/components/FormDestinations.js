import React, { useState, useEffect } from 'react';
export default function FormDestinations() {
    const [destinationData, setDestinationData] = useState([]);
	useEffect(() => {
    const fetchData = async () => {
        try {
            const destinationResponse = await fetch('/api/get-destinations', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            if (!destinationResponse.ok) {
                throw new Error(`HTTP error! status: ${destinationResponse.status}`);
            }
            const jobs = await destinationResponse.json();
            setDestinationData(jobs); 
        } catch (error) {
            console.error('Error getting destinations:', error);
        }
    };
    fetchData();
}, []);
    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    };
    console.log("Destinations:", destinationData); 
    return (
    <div>
        <h2 className="display-4">Destinations</h2>
        <p className="lead">Here is a list of all of the destinations tested.</p>
        <form className="mb-4">
            <div className="text-center d-flex justify-content-start">
                <a href="/" id="start-new-job-button" className="btn btn-light border-3" role="button">
                    Start New Job
                </a>
            </div>
        </form>
        <div className="mb-3 table-wrapper">
            <div className="table-responsive">
                <table className="table table-constrained">
                    <thead>
                        <tr>
                            <th scope="col" className="col-id">ID</th>
                            <th scope="col" className="col-url">Hostname/Domain</th>
                            <th scope="col" className="col-url">URL Path</th>
                        </tr>
                    </thead>
                    <tbody>
                                {Array.isArray(destinationData) && destinationData.map((destination, index) => (
                                <tr key={index}>
                                    <td className="col-id">{destination.destination_id}</td>
                                    <td className="col-url">{destination.hostname}</td>
                                    <td className="col-url">{destination.path}</td>
                                </tr>
                                ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    );
}
