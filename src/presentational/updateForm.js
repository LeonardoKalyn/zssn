import React from 'react';
import { FormGroup, FormControl, ControlLabel, Button, Glyphicon, InputGroup, Well } from 'react-bootstrap';
import CollapsablePanel from './../selfcontained/collapsablePanel';
import StandardFormField from './standardFormField';
import GenderRadio from './standardGenderRadio';
import MapPickerModal from './../container/mapPickerContainer';

const UpdateForm = (props) => {
    const {onChangeValue, handleValidation, onUpdateClick, onCancelClick, returnLocation, loadOldPerson} = props;
    return (
        <div>
            <h1>Update</h1>
            <Well bsSize="large">
                <CollapsablePanel btTitle="Instructions" btStyle="info">
                    <h4>To update your data fill in the Id field.</h4>
                    <h4>Your saved data will be loaded from the server a few seconds after 
                    you click the load button. (White button with an arrow facing down.</h4>
                </CollapsablePanel>
                
                <FormGroup
                    controlId={'id'}
                >
                    <InputGroup>
                        <InputGroup.Addon>
                            <Button
                                onClick={loadOldPerson}
                            >
                                <Glyphicon glyph="download-alt"/>
                            </Button>
                        </InputGroup.Addon>
                        <FormControl
                            type={'text'}
                            bsSize="large"
                            placeholder={'Your Id'}
                            onChange={ onChangeValue }
                        />
                        <FormControl.Feedback />
                    </InputGroup>
                </FormGroup>
                
                <StandardFormField
                    name="Name"
                    id="name"
                    text="Your full name"
                    changeHandler={onChangeValue}
                    value={props.newPerson.name}
                    validationHandler={handleValidation.nameValidation()}
                />
                
                <StandardFormField
                    name="Age"
                    id="age"
                    text="Your age"
                    changeHandler={onChangeValue}
                    value={props.newPerson.age}
                    validationHandler={handleValidation.ageValidation()}
                />
                
                <GenderRadio 
                    genderValidation={handleValidation.genderValidation()}
                    onChangeValue={onChangeValue}
                />
                
                <FormGroup
                    controlId="lonlat"
                    validationState={handleValidation.locationValidation()}
                >
                    <ControlLabel>Location</ControlLabel>
                    <br/>
                    <Well bsSize="large">
                        <MapPickerModal 
                            returnLocation={returnLocation}
                        />
                    </Well>
                </FormGroup>
                
                <div className="text-center">
                     <Button 
                        id="cancel"
                        bsStyle="danger"
                        onClick={onCancelClick}
                        bsSize="large"
                    >
                        Cancel
                    </Button>
                    {" "}
                    <Button 
                        id="update"
                        bsStyle="success"
                        onClick={onUpdateClick}
                        bsSize="large"
                    >
                        Update
                    </Button>
                </div>
            </Well>
        </div>
    
    );
};

export default UpdateForm;