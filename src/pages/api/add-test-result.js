import fetch from 'node-fetch';
import { query } from '../../lib/db';
import dns from 'dns';
import { promisify } from 'util';

// Convert dns.resolve4 to be promise-based
const resolve4Async = promisify(dns.resolve4);

export default async function handler(req, res) {
    try {
        const url = req.query.url; // Get the URL from the query

        let dns_response;
        try {
            const addresses = await resolve4Async(url);
            dns_response = addresses[0]; // Taking the first IP address
        } catch (error) {
            dns_response = error.message; // If there's an error in resolution, store the error message
        }

        // Fetch the URL
	const fullUrl = url.startsWith('http://') || url.startsWith('https://') ? url : 'http://' + url;

        const response = await fetch(fullUrl);
        const statusCode = response.status;

        const date = new Date();
        const timestampString = date.toISOString();

        // Values extracted from the fetched data
        const http_status_code = statusCode.toString();
        const server_response = response.statusText;

        const destination_id = 1;

	    console.log("Fetched response:", response);
console.log("DNS Response:", dns_response);


        // Insert into the database
        const result = await query(
            'INSERT INTO :SCHEMA.test_result (dns_response, http_status_code, server_response, test_timestamp, destination_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [dns_response, http_status_code, server_response, timestampString, destination_id]
        );

        res.json(result.rows[0]);

console.log("Final result:", result.rows[0]);
    } catch (error) {
	            console.error('API Error:', error);
        res.status(500).json({ message: error.message });
    }
}

