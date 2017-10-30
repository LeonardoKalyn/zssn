import React from 'react';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

const StandardFormField = ({name, id, text, value='', type="text", validationHandler, changeHandler}) => {
    return (
        <FormGroup
            controlId={id}
            validationState={validationHandler}
        >
            <ControlLabel>{name}</ControlLabel>
            <FormControl
                type={type}
                placeholder={text}
                onChange={changeHandler}
                value={value}
            />
            <FormControl.Feedback />
        </FormGroup>    
    );
};

export default StandardFormField;