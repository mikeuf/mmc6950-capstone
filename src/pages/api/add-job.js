// ../pages/api/add-job.js

import { query } from '../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  const { destinationIds } = req.body; // Extract the list of destination IDs from the request body

  if (!Array.isArray(destinationIds) || destinationIds.length === 0) {
    res.status(400).json({ message: 'destinationIds must be a non-empty array' });
    return;
  }

  try {
    // Create a new job entry and get its ID
    const jobResult = await query(
      'INSERT INTO :SCHEMA.job DEFAULT VALUES RETURNING job_id'
    );
    const jobId = jobResult.rows[0].job_id;

    // Prepare the query for linking job to destinations
    const queryString = `
      INSERT INTO :SCHEMA.job_destination (job_id, destination_id)
      VALUES ${destinationIds.map((_, idx) => `($1, $${idx + 2})`).join(', ')}
      RETURNING *;
    `;
    const values = [jobId, ...destinationIds];

    // Execute the query
    const result = await query(queryString, values);
    res.json(result.rows);
  } catch (error) {
    console.error("Database error:", error); // Improved error logging
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

