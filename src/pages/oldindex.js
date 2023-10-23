// pages/index.js

import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  return (
    <div className="container">
      <h1 className="text-center mt-5">Hello, World!</h1>

      <button className="btn btn-primary" onClick={() => alertUsingJquery()}>Click Me</button>

      <script src="/static/jquery-3.7.1.min.js"></script>
      <script>
        {`
          function alertUsingJquery() {
            if (window.$) {
              alert("Hello from jQuery!");
            } else {
              alert("jQuery not loaded!");
            }
          }
        `}
      </script>
    </div>
  );
}

