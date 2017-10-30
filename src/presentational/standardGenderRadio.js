import React from 'react';
import { FormGroup, ControlLabel, Radio } from 'react-bootstrap';

const GenderRadio =(props) =>{
    return(
        <FormGroup
            controlId="gender"
            validationState={props.genderValidation}
        >
            <ControlLabel>Gender</ControlLabel>
            <FormGroup>
                <Radio 
                    id="gender"
                    inline
                    value="M"
                    onClick={props.onChangeValue}
                    checked={props.value === "M"}
                >
                    Male
                </Radio>
                
                {' '}
                
                <Radio
                    id="gender"
                    inline
                    value="F"
                    onClick={props.onChangeValue}
                    checked={props.value === "F"}
                >
                    Female
                </Radio>
            </FormGroup>
        </FormGroup>
    );
};

export default GenderRadio;