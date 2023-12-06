import { query } from '../../lib/db';

export default async function handler(req, res) {
  try {
    const result = await query(`
      SELECT t.*
      FROM :SCHEMA.job t
      ORDER BY job_id DESC
      LIMIT 20
    `);

    const jobs = result.rows.map(job => {
      if (job.start_timestamp) {
        job.start_timestamp = job.start_timestamp.toISOString();
      }
      if (job.end_timestamp) {
        job.end_timestamp = job.end_timestamp.toISOString();
      }
      return job;
    });

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(jobs); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

