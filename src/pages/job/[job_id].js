import { query } from '../../lib/db';
import { useRouter } from 'next/router';

function Job({ job }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Job ID: {job.job_id}</h1>
      <p>User Account ID: {job.user_account_id}</p>
  <p>Start Timestamp: {job.start_timestamp || 'Not available'}</p>
	<p>End Timestamp: {job.end_timestamp || 'Not available'}</p>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { job_id } = context.params;
  try {
    const result = await query(
      `SELECT * FROM :SCHEMA.job WHERE job_id = $1`,
      [job_id]
    );
    const job = result.rows[0];

    if (job.start_timestamp) {
      job.start_timestamp = job.start_timestamp.toISOString();
    }
    if (job.end_timestamp) {
      job.end_timestamp = job.end_timestamp.toISOString();
    }

    if (!job) {
      return { notFound: true };
    }

    return { props: { job } };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
}

export default Job;

