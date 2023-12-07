# Resource Scanner

## Idea
Offload the tedious work of keeping long lists of internet resources up-to-date by letting Resource Scanner check the status of each URL in a list that you provide.

- Identify invalid URL entries.
- Discover websites that are offline or returning errors.
- Automatically combine the historical data from multiple scan jobs into a live inventory that always shows the most recent status for all URLs ever tested.
- Download reports that can imported into Excel or viewed with a text editor.

## Purpose
Resource Scanner tests the current status of a list of internet resources the user provides. Whenever possible, it differentiates between invalid URLs and temporarily unavailable resources. A database stores the results for future checks, enabling changes to be tracked over time and distinguishing between permanent unavailability or transient outages. The user can configure the scanner to send email notifications upon analysis completion.

## Link to Live Site
http://157.230.8.95/

## Instructions

### Starting a Scan
1. Add a list of destinations (URLs) to the to the text box. You can paste them manually or click the Upload List button and select a file with a list of URLs.

Resource Scanner can accept any valid URL. Here are some examples:
- example.com
- https://example.com
- example.com/path
- my.yahoo.com
- www.apple.com

The URLs can be separated into different lines or delimited by commas or tabs.

2. Click the **Start Scanning** button.

### Scanning in Progress
Resource Scanner will test the network connectivity of each destination. The results are updated after each URL is tested, allowing you to monitor the scan in real time.

#### Pausing a Scan
You can stop a running scan by clicking the **Pause** button.

### Scan Results
When the scan job is complete, the results are displayed in a table. Each scanned URL is listed with the test result. Most tests should return the status code HTTP 200. This is a standard code that means "OK" (no errors). The results are separated into a **Status** and **Details** column. A status is usually a status code or a brief summary. Details contain more descriptive information that may assist with troubleshooting. If a scan returns an error, the exact text of the error may be included.

### Destinations and Job History
The result of every scan test is automatically saved. To review a list of all URLs that have been tested, click the **Destinations** link in the header near the top of the site. The destinations are listed along with their most recent status. This can be downloaded as a tab-separated value (.tsv) file by clicking the **Download Report** button.

### Downloading Reports
The Scan Results and Destinations reports can be downloaded by clicking the **Download Report** button. The file is a tab-separated file (.tsv) that can be imported into Excel or viewed with a text editor.





