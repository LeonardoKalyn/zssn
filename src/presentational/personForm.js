import React from 'react';
import { Form, FormGroup, ControlLabel, Button, HelpBlock, Well } from 'react-bootstrap';
import CollapsablePanel from './../selfcontained/collapsablePanel';
import StandardFormField from './standardFormField';
import GenderRadio from './standardGenderRadio';
import ResourceField from './standardResourceField';
import MapPickerModal from './../container/mapPickerContainer';

const PersonForm = (props) => {
    const {onChangeValue, handleValidation, person} = props;
    return (
        <div>
            <h1>Sign Up</h1>
            <Well bsSize="large">
                
                <CollapsablePanel btTitle="Instructions" btStyle="info">
                    <h4>To sign up fill in the fields bellow.</h4>
                    <h4>Red fields are required.</h4>
                </CollapsablePanel>
                
                <StandardFormField
                    name="Name"
                    id="name"
                    text="Your full name"
                    changeHandler={onChangeValue}
                    value={person.name}
                    validationHandler={handleValidation.nameValidation()}
                />
                
                <StandardFormField
                    name="Age"
                    id="age"
                    text="Your age"
                    changeHandler={onChangeValue}
                    value={person.age}
                    validationHandler={handleValidation.ageValidation()}
                />
                
                <GenderRadio 
                    genderValidation={handleValidation.genderValidation()}
                    onChangeValue={onChangeValue}
                    value={props.person.gender}
                />
                
                <FormGroup
                    controlId="lonlat"
                    validationState={handleValidation.locationValidation()}
                >
                    <ControlLabel>Location</ControlLabel>
                    <br/>
                    <Well>
                        <MapPickerModal 
                            returnLocation={props.returnLocation}
                        />
                    </Well>
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
                        </Form>
                        
                        <Form inline>
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
                <div className="text-center">
                    <Button 
                        bsStyle="success"
                        onClick={props.onSaveClick}
                        bsSize="large"
                    >
                        Save
                    </Button>
                </div>
             </Well>
         </div>
    );
};

export default PersonForm;