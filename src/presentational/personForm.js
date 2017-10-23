import React from 'react';
import { Form, FormGroup, ControlLabel, Button, Radio, HelpBlock } from 'react-bootstrap';
import CollapsablePanel from './../selfcontained/collapsablePanel';
import StandardFormField from './standardFormField';
import ResourceField from './standardResourceField';

const PersonForm = (onChangeValue, onSaveClickt, handleValidation) => {
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
                type="number"
                changeHandler={onChangeValue}
                validationHandler={handleValidation.ageValidation()}
            />
            
            <FormGroup
                controlId="gender"
                validationState={handleValidation.genderValidation()}
            >
                <ControlLabel>Gender</ControlLabel>
                <FormGroup>
                    <Radio 
                        id="gender"
                        inline
                        value="M"
                        onClick={onChangeValue}
                    >
                        Male
                    </Radio>
                    
                    {' '}
                    
                    <Radio
                        id="gender"
                        inline
                        value="F"
                        onClick={onChangeValue}
                    >
                        Female
                    </Radio>
                </FormGroup>
            </FormGroup>
            
            <StandardFormField
                name="Location"
                id="lonlat"
                text="Your current location"
                changeHandler={onChangeValue}
                validationHandler={handleValidation.locationValidation()}
            />
            
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
                onClick={onSaveClickt}
                bsSize="large"
                block
            >
                Save
            </Button>
         </div>
    );
};

export default PersonForm;