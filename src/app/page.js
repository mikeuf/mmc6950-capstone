import CustomHead from '../components/CustomHead'; 
import NavBar from '../components/NavBar'; 
import FormUrlSubmit from '../components/FormUrlSubmit';
import FormJobSubmit from '../components/FormJobSubmit';
import FormUserSubmit from '../components/FormUserSubmit';


export default function Home() { 
  return ( 
<div>
      <CustomHead />
      <NavBar />
      <FormUrlSubmit />
      <FormJobSubmit />
      <FormUserSubmit />
    </div>
  ); 
} 

