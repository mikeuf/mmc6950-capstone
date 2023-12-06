import React, { useState, useEffect } from 'react';
export default function FormScanInProgress({ jobId, onScanComplete, onScanPaused }) {
	const [results, setResults] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [pauseRequested, setPauseRequested] = useState(false);
	const [isPaused, setIsPaused] = useState(false); 
	useEffect(() => {
		let isMounted = true;
		const fetchDestinationsAndScan = async () => {
			console.log("At beginning of fetch function: isPaused: " + isPaused);
			console.log("pauseRequested: " + pauseRequested);
			console.log("isMounted: " + isMounted);
			setIsLoading(true);
			let accumulatedResults = [];
			const response = await fetch(`/job/${jobId}/destinations`, { headers: { 'Accept': 'application/json' }});
			if (!response.ok) {
				console.error('Failed to fetch destinations:', response.statusText);
				setIsLoading(false);
				return;
			}
			const { destinationIds } = await response.json();
			const RATE_LIMIT_WAIT_TIME = 2000;
			for (const destinationId of destinationIds) {
					if (pauseRequested) {
						console.log("setIsPaused(true)");
						setIsPaused(true);  
						setPauseRequested(false);  
						onScanPaused(accumulatedResults); 
						break;  
					}
				await new Promise(resolve => setTimeout(resolve, RATE_LIMIT_WAIT_TIME));
				if (!isMounted) return;
				try {
					const destResponse = await fetch(`/destination/${destinationId}`, { headers: { 'Accept': 'application/json' }});
					if (!isMounted) return;
					if (!destResponse.ok) {
						console.error('Failed to fetch destination details:', destResponse.statusText);
						continue;
					}
					const { destination } = await destResponse.json();
					const scanResponse = await fetch(`/api/add-test-result?destination_id=${destinationId}`);
					if (!isMounted) return;
					if (!scanResponse.ok) {
						console.error('Scan error:', scanResponse.statusText);
						continue;
					}
					const scanResult = await scanResponse.json();
                        if (destination.path === "/") {
                            destination.path = ""
                        }
					setResults(currentResults => [...currentResults, {
						destination: `${destination.hostname}${destination.path || ''}`,
						status: scanResult.http_status_code === 200 ? "Online" : "Error",
						details: `HTTP ${scanResult.http_status_code} - ${scanResult.server_response}`
					}]);
                        if (destination.path === "/") {
                            destination.path = ""
                        }
					accumulatedResults.push({
						destinationId: destinationId,
						destination: `${destination.hostname}${destination.path || ''}`,
						status: scanResult.http_status_code === 200 ? "Online" : "Error",
						details: `HTTP ${scanResult.http_status_code} - ${scanResult.server_response}`
					});
				} catch (error) {
					console.error('Error during scanning:', error);
				}
			}
			console.log("isPaused: " + isPaused);
			console.log("pauseRequested: " + pauseRequested);
			console.log("isMounted: " + isMounted);
			if (!isPaused && !pauseRequested && isMounted) {
				console.log("Calling onScanComplete()");
				onScanComplete(accumulatedResults); 
			}
		};
		if (jobId && !isPaused) {
			fetchDestinationsAndScan();
		}
		return () => {
			isMounted = false;
		};
	}, [jobId, onScanComplete, onScanPaused, isPaused, pauseRequested]); 
	const handlePause = () => {
		console.log("*********** handlePause()");
		setPauseRequested(true);  
	};
	const handleResume = () => {
		console.log("handleResume()");
		setIsPaused(false);  
	};
	return (
	<div>
		<h2 className="display-5">Scan in Progress</h2>
		<p className="lead">This may take some time if you are scanning many resources.</p>
		<form className="mb-4">
			<div className="text-center d-flex justify-content-start">
				{isPaused ? (
				<button type="button" id="resume-button" className="btn btn-light me-3" onClick={handleResume}>
					Resume
				</button>
				) : (
				<button type="button" id="pause-button" className="btn btn-light me-3" onClick={handlePause}>
					Pause
				</button>
				)}
				<a role="button" id="abort-button" className="btn btn-light me-3" href="/">
					Abort
				</a>
			</div>
		</form>
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
		{ isLoading && !pauseRequested && (
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
