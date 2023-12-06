import React, { useState, useEffect } from 'react';
export default function FormDestinations() {
    const [destinationData, setDestinationData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

const fetchDestinationStatus = async (destinationId) => {
    try {
        const response = await fetch(`/api/destination/${destinationId}/status`, {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.destinationStatus;
    } catch (error) {
        console.error('Error getting destination status:', error);
        return null;
    }
};
useEffect(() => {
    const fetchData = async () => {
    setIsLoading(true);
        try {
            const destinationResponse = await fetch('/api/get-destinations', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            if (!destinationResponse.ok) {
                throw new Error(`HTTP error! status: ${destinationResponse.status}`);
            }
            const destinations = await destinationResponse.json();
            const combinedData = await Promise.all(destinations.map(async (destination) => {
                const status = await fetchDestinationStatus(destination.destination_id);
                return { ...destination, ...status };
            }));
            setDestinationData(combinedData);

    setIsLoading(false);
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

    return (
    <div>
        <h2 className="display-5">Destinations</h2>
        <p className="lead">Here is a list of all of the destinations tested.</p>
        <form className="mb-4">
            <div className="text-center d-flex justify-content-start">
                <a href="/" id="start-new-job-button" className="btn btn-light border-2" role="button">
                    Start New Job
                </a>
            </div>
        </form>
        <div className="mb-3 table-wrapper">
            <div className="table-responsive">
                <table className="table table-constrained">
                    <thead>
                        <tr>
                            <th scope="col" className="col-url">URL</th>
                            <th scope="col" className="col-url">Status</th>
                            <th scope="col" className="col-other">Last Updated</th>
                        </tr>
                    </thead>
<tbody>
    {Array.isArray(destinationData) && destinationData.map((destination, index) => (
        <tr key={index}>
            <td className="col-url">{destination.hostname}{destination.path}</td>
            <td className="col-other">{destination.http_status_code} {destination.server_response}</td>
            <td className="col-other">{formatDate(destination.test_timestamp)}</td>
        </tr>
    ))}
</tbody>
                </table>
            </div>

		{ isLoading && (
		<div className="d-flex justify-content-center">
			<div className="spinner-border" role="status">
				<span className="visually-hidden">Loading...</span>
			</div>
		</div>
		)}

        </div>
    </div>
    );
}
