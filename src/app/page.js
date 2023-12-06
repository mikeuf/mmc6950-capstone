'use client';

import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import FormUrlSubmit from '../components/FormUrlSubmit';
import FormJobHistory from '../components/FormJobHistory';
import FormDestinations from '../components/FormDestinations';
import FormSettings from '../components/FormSettings';

export default function Home() {
const [showFormUrlSubmit, setShowFormUrlSubmit] = useState(true);
const [showFormJobHistory, setShowFormJobHistory] = useState(false);
const [showFormDestinations, setShowFormDestinations] = useState(false);
const [showFormSettings, setShowFormSettings] = useState(false);

  const toggleFormSettings = () => {
    setShowFormSettings(prevState => !prevState);
    setShowFormUrlSubmit(prevState => !prevState);
  };

  const handleJobHistory = (event) => {
 event.preventDefault();
  setShowFormUrlSubmit(false);
  setShowFormSettings(false);
  setShowFormDestinations(false);
  setShowFormJobHistory(true);
  };
  const handleDestinations= (event) => {
 event.preventDefault();
  setShowFormUrlSubmit(false);
  setShowFormSettings(false);
  setShowFormJobHistory(false);
  setShowFormDestinations(true);
  };
return (
<>
<NavBar onJobHistoryClick={handleJobHistory} onDestinationsClick={handleDestinations} />
<div className="container-fluid" id="main-container-fluid">
    <div className="container" id="main-container">
        <div className="row">
            <div className="col-12 col-xl-10">
                {showFormUrlSubmit && <FormUrlSubmit onSettingsClick={toggleFormSettings} />}
                {showFormJobHistory && <FormJobHistory/>}
                {showFormDestinations && <FormDestinations/>}
		{showFormSettings && <FormSettings onSettingsClick={toggleFormSettings} />}
            </div>
        </div>
    </div>
</div>
</>
);
}

