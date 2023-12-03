// ../pages/api/add-test-result.js

import fetch from 'node-fetch';
import { query } from '../../lib/db';
import dns from 'dns';
import { promisify } from 'util';

// Convert dns.resolve4 to be promise-based
const resolve4Async = promisify(dns.resolve4);

export default async function handler(req, res) {
    try {
        const url = req.query.url; // Get the URL from the query

        // DNS resolution
        let dns_response;
        try {
            const addresses = await resolve4Async(new URL(url).hostname);
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

        // Find the destination_id for the URL
        const destinationResult = await query(
            'SELECT destination_id FROM :SCHEMA.destination WHERE hostname = $1',
            [new URL(url).hostname]
        );

        if (destinationResult.rows.length === 0) {
            res.status(404).json({ message: "Destination not found" });
            return;
        }

        const destination_id = destinationResult.rows[0].destination_id;

        // Insert into the database
        const result = await query(
            'INSERT INTO :SCHEMA.test_result (dns_response, http_status_code, server_response, test_timestamp, destination_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [dns_response, http_status_code, server_response, timestampString, destination_id]
        );

        res.json(result.rows[0]);
    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({ message: error.message });
    }
}

