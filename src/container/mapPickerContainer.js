import React from 'react';
import MapPickerModal from './../presentational/mapPickerModal';

class MapPickerContainer extends React.Component {
    
    constructor(props){
        super(props);
        
        this.state = {
            showModal: false,
            selectedLatLng:null,
            showMarker:false
        };
        
        this.handleMapClick = this.handleMapClick.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.saveLocation = this.saveLocation.bind(this);
    }
    
    handleMapClick(mouseEvent){
        this.setState({
            ...this.state,
            selectedLatLng: mouseEvent.latLng,
            showMarker: true
        });
    }
    
    toggleModal(){
        this.setState({
            ...this.state,
            showModal:!this.state.showModal
        });
    }
    
    saveLocation() {
        this.toggleModal();
        const lonlat = {
            lat: this.state.selectedLatLng.lat(),
            lon: this.state.selectedLatLng.lng()
        };
        this.props.returnLocation(lonlat);
    }
    
    render(){
        
        return (
            <MapPickerModal 
                toggleModal={this.toggleModal}
                showModal={this.state.showModal}
                showMarker={this.state.showMarker}
                onMapClick={this.handleMapClick}
                position={this.state.selectedLatLng}
                saveLocation={this.saveLocation}
            />
        );
    }
}

export default MapPickerContainer;