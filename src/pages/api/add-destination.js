import { query } from '../../lib/db';
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method Not Allowed' });
        return;
    }
    const { hostname, path } = req.body;
    if (!hostname) {
        res.status(400).json({ message: 'Hostname is required' });
        return;
    }
    try {
        const checkResult = await query(
            'SELECT destination_id FROM :SCHEMA.destination WHERE hostname = $1 AND path = $2',
            [hostname, path || '']
        );
        if (checkResult.rows.length > 0) {
            res.json(checkResult.rows[0]);
        } else {
            const insertResult = await query(
                'INSERT INTO :SCHEMA.destination (hostname, path) VALUES ($1, $2) RETURNING *',
                [hostname, path || '']
            );
            res.json(insertResult.rows[0]);
        }
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}
