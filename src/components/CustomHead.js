// components/CustomHead.js
import Head from 'next/head';

function CustomHead() {
  return (
<head>
    {/* Latest compiled and minified CSS */}
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" />
    {/* Latest compiled JavaScript */}
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js"></script>
    {/* React CDNs and Babel */}
    <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    {/* jQuery CDN */}
    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
    {/* cross-fetch polyfill */}
    <script src="https://unpkg.com/cross-fetch/dist/browser-polyfill.js"></script>
    {/* Local CSS */}
    <link rel="stylesheet" href="/static/assets/style.css" />
</head>
  );
}

export default CustomHead;

