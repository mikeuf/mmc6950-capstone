import { query } from '../../lib/db';

export default async function handler(req, res) {
	const date = new Date();
	const timestampString = date.toISOString();
	const dns_response = "143.166.135.105";
	const http_status_code = "200";
	const server_response = "HTTP OK"; 
	const test_timestamp = timestampString;
	const destination_id = 1;
	try {
		const result = await query(
			'INSERT INTO :SCHEMA.test_result (dns_response, http_status_code, server_response, test_timestamp, destination_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
			[dns_response, http_status_code, server_response, test_timestamp, destination_id]
		);
		res.json(result.rows[0]);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}

