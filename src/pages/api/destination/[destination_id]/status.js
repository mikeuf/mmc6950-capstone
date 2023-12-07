import { query } from '../../../../lib/db';

export default async function handler(req, res) {
    const { destination_id } = req.query;
    try {
        const result = await query(
            `SELECT * FROM :SCHEMA.test_result WHERE destination_id = $1 ORDER BY test_result_id DESC LIMIT 1`,
            [destination_id]
        );
        const destinationStatus = result.rows[0];
        if (!destinationStatus) {
            return res.status(404).json({ error: 'No test result found for this destination ID' });
        }
        res.status(200).json({ destinationStatus });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

