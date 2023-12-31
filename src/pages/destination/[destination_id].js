import { query } from '../../lib/db';
import { useRouter } from 'next/router';
function Destination({ destination }) {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1>Destination ID: {destination.destination_id}</h1>
      <p>Hostname: {destination.hostname}</p>
      <p>Path: {destination.path || 'None'}</p>
    </div>
  );
}
export async function getServerSideProps(context) {
  const { req, res, params } = context;
  const { destination_id } = params;
  try {
    const result = await query(
      `SELECT * FROM :SCHEMA.destination WHERE destination_id = $1`,
      [destination_id]
    );
    const destination = result.rows[0];
    if (!destination) {
      return {
        notFound: true,
      };
    }
    if (req.headers.accept && req.headers.accept.includes('application/json')) {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ destination }));
      return { props: {} };
    }
    return {
      props: { destination },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
}
export default Destination;
