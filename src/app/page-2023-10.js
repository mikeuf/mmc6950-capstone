import Head from '../components/CustomHead'; 
import NavBar from '../components/NavBar'; 
import FormUrlSubmit from '../components/FormUrlSubmit';


export default function Home() { 
  return ( 
	  <>
    <div className="container mt-5"> 
      <div className="row"> 
        <div className="col-6"> 
          <div className="card shadow-sm"> 
            <div className="card-header h5">List of Internet Resources</div> 
            <div className="card-body"> 
              <form id="submit-form"> 
                <div className="mb-3"> 
                  <label htmlFor="resource-list" className="form-label">Add a URLs to check, with one line per entry.</label> 
                  <textarea 
                    id="resource-list" 
                    name="resource-list" 
                    className="form-control" 
                    rows="10" 
                    cols="50" 
                    required
                  >
                    example.com 
                    instagram.com 
                    facebook.com 
                    google.com 
                    microsoft.com 
                  </textarea> 
                </div> 
                <button type="submit" id="submit-button" className="btn btn-primary btn-sm mb-1">Submit</button> 
              </form> 
            </div> 
          </div> 
        </div> 
        <div id="results-col" className="col-6 hidden"> 
          <div className="card shadow-sm"> 
            <div className="card-header h5">Results</div> 
            <div className="card-body"> 
              <div id="ret"></div> 
              <div id="ret-warning"></div>
            </div>
          </div>
        </div>
      </div> 
    </div> 
    <script src="/static/assets/script.js" />
	  </>
  ); 
} 

