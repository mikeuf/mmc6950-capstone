import fetch from 'node-fetch';
import { query } from '../../lib/db';
import dns from 'dns';
import { promisify } from 'util';
const resolve4Async = promisify(dns.resolve4);
export default async function handler(req, res) {
    try {
        const { destination_id } = req.query; 
        const destinationResult = await query(
            'SELECT hostname FROM :SCHEMA.destination WHERE destination_id = $1',
            [destination_id]
        );
        const hostname = destinationResult.rows[0]?.hostname;
        if (!hostname) {
            return res.status(404).json({ message: "Hostname not found for the given destination_id" });
        }
        const url = `http://${hostname}`; 
        let dns_response;
        try {
            const addresses = await resolve4Async(new URL(url).hostname);
            dns_response = addresses[0]; 
        } catch (error) {
            dns_response = error.message; 
        }
        const response = await fetch(url);
        const statusCode = response.status;
        const date = new Date();
        const timestampString = date.toISOString();
        const http_status_code = statusCode.toString();
        const server_response = response.statusText;
        const result = await query(
            'INSERT INTO :SCHEMA.test_result (dns_response, http_status_code, server_response, test_timestamp, destination_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [dns_response, http_status_code, server_response, timestampString, destination_id]
        );
        if (result.rows.length === 0) {
            throw new Error('Insert operation failed or did not return any rows.');
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({ message: 'Error processing request', error: error.message });
    }
}
