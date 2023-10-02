import { query } from '../../lib/db';

export default async function handler(req, res) {
	 const first_name = "Mike";
  const last_name = "Black";
  const email_address = "mblack101@ufl.edu";
  try {
    const result = await query(
      'INSERT INTO :SCHEMA.user_account (first_name, last_name, email_address) VALUES ($1, $2, $3) RETURNING *',
      [first_name, last_name, email_address]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

