import React, { useState } from 'react';
import "leaflet/dist/leaflet.css"
import './App.css';
// required to fix issue with webpack causing issues with map marker icons
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import 'leaflet-defaulticon-compatibility';
import ApiKeyForm from './components/ApiKeyForm';
import Map from './components/Map';
import { AppBar, Toolbar, Typography } from '@mui/material';
import Logo from "./bikon_light.png";
import { Box } from '@mui/system';

function App() {

  const [apiKey, setApiKey] = useState();

  return (
  <div className="App">
    <AppBar title={<img src="../public/bikon.png" alt="Bike Icon"/>} style={{minHeight: '64px'}} position="sticky">
      <Toolbar>
        <Box
              component="img"
              sx={{
              height: 64,
              }}
              alt="Bike icon"
              src={Logo}
          />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          London Bike Share Finder
        </Typography>
      </Toolbar>
    </AppBar>
    
    <div>
      {apiKey ? <Map apiKey={apiKey}></Map> : <ApiKeyForm setApiKey={setApiKey}></ApiKeyForm> }
    </div>

  </div>
  );
}

export default App;
