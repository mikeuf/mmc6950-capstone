import { query } from '../../lib/db';

export default async function handler(req, res) {
  const destinationIds = [1, 2, 3];  // Temporary POC data 

  try {
    const jobResult = await query(
      'INSERT INTO :SCHEMA.job DEFAULT VALUES RETURNING job_id'
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
    res.status(500).json({ message: error.message });
  }
}

