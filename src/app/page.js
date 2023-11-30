'use client';

import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import FormUrlSubmit from '../components/FormUrlSubmit';
import FormJobSubmit from '../components/FormJobSubmit';
import FormJobDestinationSubmit from '../components/FormJobDestinationSubmit';
import FormSettings from '../components/FormSettings';

export default function Home() {
const [showFormUrlSubmit, setShowFormUrlSubmit] = useState(true);
const [showFormJobSubmit, setShowFormJobSubmit] = useState(false);
const [showFormJobDestinationSubmit, setShowFormJobDestinationSubmit] = useState(false);
const [showFormSettings, setShowFormSettings] = useState(false);

  const toggleFormSettings = () => {
    setShowFormSettings(prevState => !prevState);
    setShowFormUrlSubmit(prevState => !prevState);
  };

return (
<>
<NavBar />
<div className="container-fluid" id="main-container-fluid">
    <div className="container" id="main-container">
        <div className="row">
            <div className="col-12 col-md-10 col-lg-8">
                {showFormUrlSubmit && <FormUrlSubmit onSettingsClick={toggleFormSettings} />}
                {showFormJobSubmit && <FormJobSubmit />}
                {showFormJobDestinationSubmit && <FormJobDestinationSubmit/>}
		{showFormSettings && <FormSettings onSettingsClick={toggleFormSettings} />}
            </div>
        </div>
    </div>
</div>
</>
);
}

