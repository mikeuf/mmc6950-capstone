import { query } from '../../../lib/db';
import { useRouter } from 'next/router';
export default function JobDestinations({ destinations, error }) {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div>
      <h1>Destinations for Job ID: {router.query.job_id}</h1>
      {destinations.map((destination, index) => (
        <div key={index}>
          <h2>Destination ID: {destination.destination_id}</h2>
          <p>Hostname: {destination.hostname}</p>
          <p>Path: {destination.path}</p>
        </div>
      ))}
    </div>
  );
}
export async function getServerSideProps(context) {
  const { req, res, params } = context;
  const { job_id } = params;
  const sqlString = `
    SELECT d.destination_id
    FROM :SCHEMA.job j
    JOIN :SCHEMA.job_destination jd ON j.job_id = jd.job_id
    JOIN :SCHEMA.destination d ON jd.destination_id = d.destination_id
    WHERE j.job_id = $1
  `;
  try {
    const result = await query(sqlString, [job_id]);
    const destinationIds = result.rows.map(row => row.destination_id);
    if (req.headers.accept.includes('application/json')) {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ destinationIds }));
      return { props: {} }; 
    }
    return {
      props: {
        destinations: result.rows
      }
    };
  }
  catch (error) {
    console.error(error);
    return {
      props: {
        error: error.message,
        destinations: []
      }
    };
  }
}
