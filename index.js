
// CORS code is from https://expressjs.com/en/resources/middleware/cors.html#enabling-cors-pre-flight
var express = require('express');
var cors = require('cors');
var app = express();

app.options('*', cors()); // Allow all destinations to bypass CORS
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  // Send the HTML page as a response
  res.send(`
    <!DOCTYPE html>
<html>
<head>
    <!-- Latest compiled and minified CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Latest compiled JavaScript -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js"></script>
    <!-- React CDNs and Babel -->
    <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <!-- jQuery CDN -->
    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
    <!-- cross-fetch polyfill -->
    <script src="https://unpkg.com/cross-fetch/dist/browser-polyfill.js"></script>
    <!-- Local CSS -->
    <link rel="stylesheet" href="assets/style.css">
</head>
<body>
<nav class="navbar navbar-dark bg-primary">
    <div class="container">
        <a class="navbar-brand" href="#">
            Resource Scanner - Proof of Concept
            <!--
              <img src="/docs/5.0/assets/brand/bootstrap-logo.svg" alt="Resource Scanner" width="30" height="24">
              -->
        </a>
    </div>
</nav>
<div class="container mt-5">
    <div class="row">
        <div class="col-6">
            <div class="card shadow-sm">
                <div class="card-header h5">List of Internet Resources</div>
                <div class="card-body">
                    <form action="javascript:submitList(event);false">
                        <div class="mb-3">
                            <label for="resource-list" class="form-label">Add a URLs to check, with one line per
                                entry.</label>
                            <textarea id="resource-list" name="resource-list" class="form-control" rows="10" cols="50"
                                      required>
example.com
instagram.com
facebook.com
google.com
microsoft.com
                </textarea>
                        </div>
                        <button type="submit" id="submit-button" class="btn btn-primary btn-sm mb-1">Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
        <div id="results-col" class="col-6 hidden">
            <div class="card shadow-sm">
                <div class="card-header h5">Results</div>
                <div class="card-body">
                    <div id="ret"></div>
                    <div id="ret-warning"></div>
                </div>
            </div>
        </div>
       <script src="assets/script.js"></script>
        <script>
            function resetAllFields() {
                var resourceListTextarea = document.getElementById("resource-list");
                var resultsColumn = document.querySelector("#results-col");
                var submitButton = document.querySelector("#submit-button");
                resourceListTextarea.value = "";
                resultsColumn.classList.add("hidden");
                submitButton.classList.add("disabled");
            }

        </script>
</body>
</html>
`);
});



// Send network requests from the server to avoid browser CORS restrictions
app.get('/scan', (req, res) => {
  const url = req.query.url;

  fetch(url)
    .then(response => {
      const statusCode = response.status;
      res.status(statusCode).send(`Status Code: ${statusCode}`);
    })
    .catch(error => {
      console.error(error);

      res.status(500).send('An error occurred during the request');
    });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
