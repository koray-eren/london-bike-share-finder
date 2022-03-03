import React, { useEffect, useState } from 'react';
import "leaflet/dist/leaflet.css"
import '../App.css';
import { getBikePoints } from '../services/apiServices';
import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet'
// required to fix issue with webpack causing issues with icon image
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import 'leaflet-defaulticon-compatibility';
import { CircularProgress, Modal } from '@mui/material';

function LoadingModal(){
  return(
    <Modal
      open={true}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div style={{display:'flex', justifyContent:'center', alignItems:'center', height: '100vh'}}>
        <CircularProgress />
      </div>
    </Modal>
  );
}

function Map(props) {

  const [data, setData] = useState();
  const [bikePointMarkers, setBikePointMarkers] = useState();

  useEffect(() => {
    getBikePoints(props.apiKey)
      .then(responseData => {
        // extract and keep only relevant data
        // TODO: add a test for the shape of the api data - i.e. if the api data shape changes, the tests will break
        // can we auto run these tests every few months and alert me if it's changed
        const transformedData = responseData.map(({id, lat, lon, commonName, additionalProperties}) => ({
          id, lat, lon, commonName, 
          bikes : (additionalProperties[6].key === "NbBikes" ? additionalProperties[6].value : 'ERROR'),
          emptyDocks : (additionalProperties[7].key === "NbEmptyDocks" ? additionalProperties[7].value : 'ERROR'),
          docks : (additionalProperties[8].key === "NbDocks" ? additionalProperties[8].value : 'ERROR'),
        }) );        
        console.log(transformedData);
        setData(transformedData);
        const bikePointMarkers = transformedData.map(bikePoint => 
      
          <Marker key={bikePoint.id} position={[bikePoint.lat, bikePoint.lon]}>
            <Popup>
              <h3>{bikePoint.commonName}</h3>
              Bikes Available: {bikePoint.bikes} <br />
              Empty Docks: {bikePoint.emptyDocks}
            </Popup>
          </Marker>
        );
        setBikePointMarkers(bikePointMarkers);
      })
  }, [props.apiKey] );

  return (
    <MapContainer center={[51.505, -0.09]} zoom={13}>
      <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {bikePointMarkers ? bikePointMarkers : <LoadingModal></LoadingModal>}
    </MapContainer>
  );
}



export default Map;
