import { query } from '../../lib/db';

export default async function handler(req, res) {
  try {
    const result = await query(`
      SELECT t.*
      FROM :SCHEMA.destination t
      ORDER BY hostname
      LIMIT 500
    `);

    const destinations = result.rows;

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(destinations); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

