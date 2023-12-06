import { query } from '../../lib/db';

export default async function handler(req, res) {
  try {
	  const {destination_id} = req.query;
    const result = await query(`
SELECT * FROM :SCHEMA.test_result WHERE destination_id = $1 ORDER BY test_result_id DESC LIMIT 1`,
	    [destination_id]
    );

        const destinationStatus = result.rows;

      if (destinationStatus.test_timestamp) {
        destinationStatus.test_timestamp = destinationStatus.test_timestamp.toISOString();
      }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(destinationStatus); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

