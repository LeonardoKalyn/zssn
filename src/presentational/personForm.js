import React from 'react';
import { Form, FormGroup, ControlLabel, Button, HelpBlock } from 'react-bootstrap';
import CollapsablePanel from './../selfcontained/collapsablePanel';
import StandardFormField from './standardFormField';
import GenderRadio from './standardGenderRadio';
import ResourceField from './standardResourceField';
import MapPickerModal from './../container/mapPickerContainer';

const PersonForm = (props) => {
    const {onChangeValue, handleValidation, onSaveClick, returnLocation} = props;
    return (
            
        <div>
            <h1>Sign Up</h1>
            <CollapsablePanel btTitle="Instructions" btStyle="info">
                <h4>To sign up fill in the fields bellow.</h4>
                <h4>Red fields are required.</h4>
            </CollapsablePanel>
            
            <StandardFormField
                name="Name"
                id="name"
                text="Your full name"
                changeHandler={onChangeValue}
                validationHandler={handleValidation.nameValidation()}
            />
            
            <StandardFormField
                name="Age"
                id="age"
                text="Your age"
                changeHandler={onChangeValue}
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
                <MapPickerModal 
                    returnLocation={returnLocation}
                />
            </FormGroup>
            
            <FormGroup>
                <ControlLabel>Resources</ControlLabel>
                <HelpBlock>
                    To ensure the survival of all, please share the amount of the following resources that you posses.
                </HelpBlock>
                <Form inline>
                    <ResourceField
                        id="Water"
                        glyph="tint"
                        changeHandler={onChangeValue}
                        validationHandler={handleValidation.resourceValidation}
                        
                    />
                    
                    <ResourceField
                        id="Food"
                        glyph="cutlery"
                        changeHandler={onChangeValue}
                        validationHandler={handleValidation.resourceValidation}
                        
                    />
                    
                    <ResourceField
                        id="Medication"
                        glyph="plus"
                        changeHandler={onChangeValue}
                        validationHandler={handleValidation.resourceValidation}
                        
                    />
                    
                    <ResourceField
                        id="Ammunition"
                        glyph="fire"
                        changeHandler={onChangeValue}
                        validationHandler={handleValidation.resourceValidation}
                        
                    />
                </Form>
                
            </FormGroup>
                
            <Button 
                bsStyle="success"
                onClick={onSaveClick}
                bsSize="large"
                block
            >
                Save
            </Button>
         </div>
    );
};

export default PersonForm;