// get-jobs.js
//
// Retrieve a list of all jobs from the database
import { query } from '../../lib/db';


export default async function handler(req, res) {
//  res.status(200).json({ text: 'Jobs' });
  try {
    const result = await query(
      'SELECT * FROM :SCHEMA.job',
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
