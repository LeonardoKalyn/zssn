import React from 'react';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

const StandardFormField = ({name, id, text, type="text", validationHandler, changeHandler}) => {
    return (
        <FormGroup
            validationState={validationHandler}
        >
            <ControlLabel>{name}</ControlLabel>
            <FormControl
                id={id}
                type={type}
                placeholder={text}
                onChange={changeHandler}
            />
            <FormControl.Feedback />
        </FormGroup>    
    );
};

export default StandardFormField;