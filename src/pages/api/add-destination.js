import { query } from '../../lib/db';

const hostname = "dell.com";
const path = "";

export default async function handler(req, res) {
  const { hostname, path } = req.body;
  try {
    const result = await query(
      'INSERT INTO destination (hostname, path) VALUES ($1, $2) RETURNING *',
      [hostname, path]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

