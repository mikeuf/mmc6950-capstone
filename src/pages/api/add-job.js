import { query } from '../../lib/db';
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }
  const { destinationIds } = req.body; 
  if (!Array.isArray(destinationIds) || destinationIds.length === 0) {
    res.status(400).json({ message: 'destinationIds must be a non-empty array' });
    return;
  }
  try {
    const jobResult = await query(
      'INSERT INTO :SCHEMA.job (start_timestamp) VALUES (NOW()) RETURNING job_id;'
);
    const jobId = jobResult.rows[0].job_id;
    const queryString = `
      INSERT INTO :SCHEMA.job_destination (job_id, destination_id)
      VALUES ${destinationIds.map((_, idx) => `($1, $${idx + 2})`).join(', ')}
      RETURNING *;
    `;
    const values = [jobId, ...destinationIds];
    const result = await query(queryString, values);
    res.json(result.rows);
  } catch (error) {
    console.error("Database error:", error); 
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}
