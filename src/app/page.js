import React from 'react';
import CustomHead from '../components/CustomHead'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../public/static/style.css';
import NavBar from '../components/NavBar'; 
import FormUrlSubmit from '../components/FormUrlSubmit';
import FormJobSubmit from '../components/FormJobSubmit';
import FormJobDestinationSubmit from '../components/FormJobDestinationSubmit';


export default function Home() { 
  return ( 
<>      
<CustomHead />
      <NavBar />
	  <div className="container-fluid" id="main-container-fluid">
	  <div className="container" id="main-container">
      <FormUrlSubmit />
      <FormJobSubmit />
      <FormJobDestinationSubmit />
	  </div>
	  </div>
	  </>
  ); 
} 

