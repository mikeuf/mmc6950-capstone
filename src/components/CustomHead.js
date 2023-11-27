// components/CustomHead.js
import Head from 'next/head';

function CustomHead() {
  return (
    <Head>
      {/* Bootstrap */}
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" />
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js"></script>
      {/* cross-fetch polyfill */}
      <script src="https://unpkg.com/cross-fetch/dist/browser-polyfill.js"></script>
      <link rel="stylesheet" href="/static/style.css" />
      {/* Adobe Fonts */}
	  <link rel="stylesheet" href="https://use.typekit.net/cmn5cya.css" />
    </Head>
  );
}

export default CustomHead;

