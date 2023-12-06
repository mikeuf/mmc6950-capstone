# Resource Scanner

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

The URLs can be separated into different lines, or delimited by commas or tabs.

2. Click the *Start Scanning* button.

### Scanning in Progress
Resource Scaner will test the network connectivity of each destination. The results are updated after each URL is tested, allowing you monitor the scan in real-time.

#### Pausing a Scan
You can stop a running scan by clicking the Pause button.

### Scan Results
When the scan job is complete, the results are displayed in a table. Each scanned URL is listed with the result of the test. Most tests should return the status code HTTP 200. This is a standard code that means "OK" (no errors). The results are separated into a Status and Details column. The Status values are usually brief summaries. Details contain more descriptive information that may assist with troubleshooting. If a scan returns an error, the exact text of the error may be included.

#### Downloading Reports
The scan results can be download by clicking the "Download Report" button. The file is a tab-separated file (.tsv) which can be imported into Excel or viewed with a text editor.

### Destinations
The results of every scan t


