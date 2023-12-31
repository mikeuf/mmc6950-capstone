function resetAllFields() {
    var resourceListTextarea = document.getElementById("resource-list");
    var resultsColumn = document.querySelector("#results-col");
    var submitButton = document.querySelector("#submit-button");
    resourceListTextarea.value = "";
    resultsColumn.classList.add("hidden");
    submitButton.classList.add("disabled");
}


window.submitList = function () {

    //  Display Results column
    let resultsColumn = document.querySelector("#results-col");
    resultsColumn.classList.remove("hidden");
    let ret = document.querySelector("#ret");
    // Get user supplied list of URLs
    let resourceList = document.querySelector("#resource-list").value;


    // This is a temporary workaround for the POC. The final product will have proper text parsing and input validation.
    const urlList = [
'http://www.example.com',
'http://www.instagram.com',
'http://www.facebook.com',
'http://www.google.com',
'http://www.microsoft.com'
    ];
    async function checkUrls(urlList) {
        const results = [];
        const RATE_LIMIT_WAIT_TIME = 2000;
        let ret = document.querySelector("#ret");
        for (const url of urlList) {
            // Wait for a short time between each HTTP request
            await new Promise(resolve => setTimeout(resolve, RATE_LIMIT_WAIT_TIME));

            // Pass the URL as a query parameter to a server-side Express.js app to send the network requests.
            fetch(`/add-test-result?url=${encodeURIComponent(url)}`, {
                method: 'GET'
            })
                .then(response => response.text())
		.then(data => {
			console.log(data);
		});
                .then(result => {
                    let resultEntry;
                    if (result.redirected) {
                        // If redirected, automatically get the redirect URL
                        resultEntry = `Redirect (${result.url})`;
                    } else {
                        resultEntry = `${result.status} ${result.statusText}`;
                    }
                    ret.innerHTML += `${url}\t${result}<br>`;
                })
                .catch(error => {
                    console.error('Error:', error);
                    ret.innerHTML += `${url}\t${error.message}<br>`;
                });
        }
    }

    checkUrls(urlList);
}

