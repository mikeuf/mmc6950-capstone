'use client';

import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import FormUrlSubmit from '../components/FormUrlSubmit';
import FormJobHistory from '../components/FormJobHistory';
import FormDestinations from '../components/FormDestinations';

export default function Home() {
const [showFormUrlSubmit, setShowFormUrlSubmit] = useState(true);
const [showFormJobHistory, setShowFormJobHistory] = useState(false);
const [showFormDestinations, setShowFormDestinations] = useState(false);

  const handleJobHistory = (event) => {
 event.preventDefault();
  setShowFormUrlSubmit(false);
  setShowFormDestinations(false);
  setShowFormJobHistory(true);
  };
  const handleDestinations= (event) => {
 event.preventDefault();
  setShowFormUrlSubmit(false);
  setShowFormJobHistory(false);
  setShowFormDestinations(true);
  };
return (
<div id="container-total">
<NavBar onJobHistoryClick={handleJobHistory} onDestinationsClick={handleDestinations} />
<div className="container-fluid" id="main-container-fluid">
    <div className="container" id="main-container">
        <div className="row">
            <div className="col-12 col-xl-10 mt-2">
                {showFormUrlSubmit && <FormUrlSubmit/>}
                {showFormJobHistory && <FormJobHistory/>}
                {showFormDestinations && <FormDestinations/>}
            </div>
        </div>
    </div>
</div>
</div>
);
}

