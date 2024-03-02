// src/components/Home.js
import '../css/Home.css'; // Import your CSS file
import { Button } from '@mui/material';

const Home = () => {
  return (
    <div className="banner-container">
      <div className="text-center">
        <h1 className="text-6xl">Welcome to Todo Application</h1>
        <h4 className="text-4xl">Track your Daily Todo's here</h4>
        <h4>New to the website ? 
            <Button variant='outlined' style={{marginLeft : '10px'}} href="/Signup">Sign Up</Button>
        </h4>
        <h4>
            Login Here      
            <Button variant='outlined' style={{marginLeft : '10px'}} href="/LogIn">Log In</Button>
        </h4>
      </div>
    </div>
  );
};

export default Home;
