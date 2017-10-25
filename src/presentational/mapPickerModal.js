import React from 'react';
import { Modal, Button, Glyphicon } from 'react-bootstrap';
import GoogleMap from './googleMap';

const MapPickerModal = (props) => {
    return (
        <div>
            <div className='text-center'>
                <Button 
                    bsStyle='primary'
                    bsSize='large'
                    onClick={props.toggleModal}
                >
                  <Glyphicon glyph='map-marker' />
                </Button>
            </div>
            <Modal show={props.showModal}>
                    <Modal.Header>
                        <Modal.Title>
                            Location
                        </Modal.Title>
                    </Modal.Header>
                    
                    <Modal.Body>
                        <GoogleMap 
                            onMapClick={props.onMapClick}
                            position={props.position}
                            showMarker={props.showMarker}
                        />
                    </Modal.Body>
                    
                    <Modal.Footer>
                        <div className='text-center'>
                            <Button 
                                onClick={props.saveLocation}
                                bsStyle='success'
                            >
                                <Glyphicon glyph='map-marker' />
                            </Button>
                        </div>
                    </Modal.Footer>
            </Modal>
        </div>
    );
};

export default MapPickerModal;