'use client';

import React, { useState } from 'react';
import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../public/static/style.css';
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
<Head>
    <link href="https://use.typekit.net/cmn5cya.css" rel="stylesheet" type="text/css" />
</Head>
<NavBar />
<div className="container-fluid" id="main-container-fluid">
    <div className="container" id="main-container">
        <div className="row">
            <div className="col-12 col-md-10 col-lg-6">
                {showFormUrlSubmit && <FormUrlSubmit onSettingsClick={toggleFormSettings} />}
                {showFormJobSubmit && <FormJobSubmit />}
                {showFormJobDestinationSubmit && <FormJobDestinationSubmit/>}
                {showFormSettings && <FormSettings/>}
            </div>
        </div>
    </div>
</div>
</>
);
}

