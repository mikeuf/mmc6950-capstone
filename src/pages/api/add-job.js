import { query } from '../../lib/db';

const destination_id = 1;

export default async function handler(req, res) {
  const { hostname, path } = req.body;
  try {
    const result = await query(
      'INSERT INTO job (destination_id) VALUES ($1) RETURNING *',
      [destination_id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

