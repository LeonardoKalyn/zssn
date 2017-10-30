import React from 'react';
import { Alert, Button, Modal} from 'react-bootstrap';

const StandardAlert = (props) => {
    return (
        <Modal show={props.showModal}>
            <Modal.Header>
                <Modal.Title>
                    {props.title}
                </Modal.Title>
            </Modal.Header>
            
            <Modal.Body>
                <Alert bsStyle={props.bsStyle}>
                    {props.children}
                </Alert>
            </Modal.Body>
            
            <Modal.Footer>
                <div className='text-center'>
                    <Button 
                        onClick={props.onButtonClick}
                        bsStyle={props.bsStyle}
                    >
                        OK
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
};

export default StandardAlert;