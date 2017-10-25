import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import React from 'react';

const CompousedMap = withScriptjs(withGoogleMap((props) => {
    return(
      <GoogleMap
        defaultZoom={14}
        defaultCenter={{ 
            lat: -16.675004741247513, lng: -49.258103370666504 }}
        onClick={props.onMapClick}
      >
            {props.isMarkerShown && <Marker position={props.position}/>}
      </GoogleMap>
      );
}));

const MapComponent = (props)=>{
    return(
        <CompousedMap
            isMarkerShown={props.showMarker}
            position={props.position}
            onMapClick={props.onMapClick}
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
        />
    );
};

export default MapComponent;