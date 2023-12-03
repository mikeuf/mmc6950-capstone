import React, { useState, useEffect } from 'react';

export default function FormScanInProgress({ jobId, onScanComplete }) {
console.log("FormScanInProgressi()");
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true; 

        const fetchDestinationsAndScan = async () => {
            setIsLoading(true);
            let accumulatedResults = []; 
console.log("MARKER A");
            const response = await fetch(`/job/${jobId}/destinations`, { headers: { 'Accept': 'application/json' }});
console.log("MARKER B");
                if (!isMounted) return; 

            if (!response.ok) {
                console.error('Failed to fetch destinations:', response.statusText);
                setIsLoading(false);
                return;
            }


            const { destinationIds } = await response.json();

            const RATE_LIMIT_WAIT_TIME = 2000;
console.log(destinationIds);
            for (const destinationId of destinationIds) {
                await new Promise(resolve => setTimeout(resolve, RATE_LIMIT_WAIT_TIME));

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

                    
                    setResults(currentResults => [...currentResults, {
                        destination: `http://${destination.hostname}${destination.path || ''}`,
                        status: scanResult.http_status_code === 200 ? "Online" : "Error",
                        details: `HTTP ${scanResult.http_status_code} - ${scanResult.server_response}`
                    }]);
          accumulatedResults.push({
                        destinationId: destinationId,
                        destination: `http://${destination.hostname}${destination.path || ''}`,
                        status: scanResult.http_status_code === 200 ? "Online" : "Error",
                        details: `HTTP ${scanResult.http_status_code} - ${scanResult.server_response}`
                    });
                } catch (error) {
                    console.error('Error during scanning:', error);
                }
            }

            setIsLoading(false);
            

            onScanComplete(accumulatedResults); 

        };

        if (jobId) {
            fetchDestinationsAndScan();
        }

   
        return () => {
            isMounted = false; 
        };
    }, [jobId, onScanComplete]); 




    return (
      <div>
            <h2 className="display-4">Scan in Progress</h2>
            {isLoading && (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}
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

