import React from 'react';
import CustomHead from '../components/CustomHead'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from '../components/NavBar'; 
import FormUrlSubmit from '../components/FormUrlSubmit';
import FormJobSubmit from '../components/FormJobSubmit';
import FormJobDestinationSubmit from '../components/FormJobDestinationSubmit';


export default function Home() { 
  return ( 
<div className="container">
      <CustomHead />
      <NavBar />
      <FormUrlSubmit />
      <FormJobSubmit />
      <FormJobDestinationSubmit />
    </div>
  ); 
} 

