import { query } from '../../lib/db';
import { useRouter } from 'next/router';

function TestResult({ testResult }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Test Result ID: {testResult.test_result_id}</h1>
      <p>Timestamp: {testResult.test_timestamp}</p>
      <p>DNS Response: {testResult.dns_response}</p>
      <p>HTTP Status Code: {testResult.http_status_code}</p>
      <p>Server Response: {testResult.server_response}</p>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { test_result_id } = context.params;
  try {
    const result = await query(
      `SELECT * FROM :SCHEMA.test_result WHERE test_result_id = $1`,
      [test_result_id]
    );
    const testResult = result.rows[0];
    
    if (testResult) {
      testResult.test_timestamp = testResult.test_timestamp && testResult.test_timestamp.toISOString();
    }

    return {
      props: { testResult }, 
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
}

export default TestResult;

