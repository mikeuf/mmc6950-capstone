import { query } from '../../../lib/db';
import { useRouter } from 'next/router';
export default function destinationStatus({ destinationStatus, error }) {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div>
      <h1>Test Result ID: {destinationStatus.test_result_id}</h1>
      <p>Timestamp: {destinationStatus.test_timestamp}</p>
      <p>DNS Response: {destinationStatus.dns_response}</p>
      <p>HTTP Status Code: {destinationStatus.http_status_code}</p>
      <p>Server Response: {destinationStatus.server_response}</p>
    </div>
  );
}
export async function getServerSideProps(context) {
  const { req, res, params } = context;
    const { destination_id } = params;
    try {
        const result = await query(
            `SELECT * FROM :SCHEMA.test_result WHERE destination_id = $1 ORDER BY test_result_id DESC LIMIT 1`,
            [destination_id]
        );

        let destinationStatus = result.rows[0];

        if (destinationStatus && destinationStatus.test_timestamp) {
            // Convert Date object to ISO string
            destinationStatus = {
                ...destinationStatus,
                test_timestamp: destinationStatus.test_timestamp.toISOString(),
            };
        }

    if (req.headers.accept.includes('application/json')) {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ destinationStatus}));
      return { props: {} }; 
    }
        return { props: { destinationStatus } };
    }
    catch (error) {
        console.error(error);
        return {
            props: {
                error: error.message
            }
        };
    }
}

