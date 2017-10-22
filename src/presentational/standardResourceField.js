import React from 'react';
import { FormGroup, InputGroup, Glyphicon, FormControl } from 'react-bootstrap';

const ResourceField = ({
    id,
    text=id,
    type="number",
    glyph,
    validationHandler,
    changeHandler
}) => {
    return (
        <FormGroup
            validationState={validationHandler(id)}
        >
            <InputGroup>
                <InputGroup.Addon>
                    <Glyphicon glyph={glyph} />
                </InputGroup.Addon>
                <FormControl
                    id={id}
                    type={type}
                    placeholder={text}
                    onChange={ changeHandler }
                />
                <FormControl.Feedback />
            </InputGroup>
        </FormGroup>
    );
};

export default ResourceField;