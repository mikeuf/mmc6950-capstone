import { query } from '../../lib/db';
import { useRouter } from 'next/router';

function UserAccount({ userAccount }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User Account ID: {userAccount.user_account_id}</h1>
      <p>First Name: {userAccount.first_name}</p>
      <p>Last Name: {userAccount.last_name}</p>
      <p>Email Address: {userAccount.email_address}</p>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { user_account_id } = context.params;
  try {
    const result = await query(
      `SELECT * FROM :SCHEMA.user_account WHERE user_account_id = $1`,
      [user_account_id]
    );
    const userAccount = result.rows[0];
    if (!userAccount) {
      return {
        notFound: true,
      };
    }
    return {
      props: {
        userAccount,
      },
    };
  } catch (error) {
    return {
      props: {
        error: error.message,
      },
    };
  }
}

export default UserAccount;

