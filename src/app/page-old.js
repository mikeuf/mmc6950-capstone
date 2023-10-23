// import 'bootstrap/dist/css/bootstrap.min.css';
import Head from '../components/CustomHead';
import NavBar from '../components/NavBar';

export default function Home() {
return (
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
);
}

