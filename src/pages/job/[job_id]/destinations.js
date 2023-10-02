import { query } from '../../../lib/db';
import { useRouter } from 'next/router';

function JobDestinations({ destinations }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
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
  const { job_id } = context.params;
  try {
    const result = await query(
      `
        SELECT destination.*
        FROM :SCHEMA.job
        JOIN :SCHEMA.job_destination ON job.job_id = job_destination.job_id
        JOIN :SCHEMA.destination ON job_destination.destination_id = destination.destination_id
        WHERE job.job_id = $1
      `,
      [job_id]
    );
    const destinations = result.rows;
    return {
      props: {
        destinations
      },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
}

export default JobDestinations;

