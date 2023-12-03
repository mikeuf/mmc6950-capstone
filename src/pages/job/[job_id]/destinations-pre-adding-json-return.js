import { query } from '../../../lib/db';
import { useRouter } from 'next/router';

export default function JobDestinations({ destinations, error }) {
  const router = useRouter();

  // If the page is in a "fallback" state, show a loading message
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  // If there's an error, show an error message
  if (error) {
    return <div>Error: {error}</div>;
  }

  // If there's no error, display the destinations
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
        SELECT destination.*
FROM :SCHEMA.job
JOIN :SCHEMA.job_destination ON :SCHEMA.job.job_id = :SCHEMA.job_destination.job_id
JOIN :SCHEMA.destination ON :SCHEMA.job_destination.destination_id = :SCHEMA.destination.destination_id
WHERE :SCHEMA.job.job_id = $1
  `;
  
  console.log('Executing SQL:', sqlString, 'with job_id:', job_id);

  try {
    const result = await query(sqlString, [job_id]);
    const destinations = result.rows;

    console.log('Results:', destinations);

    // Check the 'Accept' header to determine the response type
    if (req.headers.accept.includes('application/json')) {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ destinations }));
      return; // End here
    }

    return {
      props: {
        destinations
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


