import React from 'react';
import { Form, FormGroup, ControlLabel, Button, HelpBlock, Glyphicon, Table } from 'react-bootstrap';
import ResourceField from './standardResourceField';
import StandardFormField from './standardFormField';
import CollapsablePanel from './../selfcontained/collapsablePanel';

const TradeForm = (props) => {
    const {onChangeValue, handleValidation} = props;
    return (
        <div>
            <h1>Sign Up</h1>
            <CollapsablePanel btTitle="Instructions" btStyle="info">
                <h4>To execute the trade, fill in the fields bellow.</h4>
                <h4>The trade is based on a point system, in witch every resource
                has a number of points as value.</h4>
                <h4>The number of points of each side of the trade must be equal.</h4>
                
                <Table responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><Glyphicon glyph='tint' /></td>
                            <td>Water</td>
                            <td>4</td>
                        </tr>
                        <tr>
                            <td><Glyphicon glyph='cutlery' /></td>
                            <td>Food</td>
                            <td>3</td>
                        </tr>
                        <tr>
                            <td><Glyphicon glyph='plus' /></td>
                            <td>Medication</td>
                            <td>2</td>
                        </tr>
                        <tr>
                            <td><Glyphicon glyph='fire' /></td>
                            <td>Ammunition</td>
                            <td>1</td>
                        </tr>
                    </tbody>
                </Table>
            </CollapsablePanel>
            
            <StandardFormField
                name="Id"
                id="id"
                text="Your id"
                changeHandler={onChangeValue}
            />
            
            <StandardFormField
                name="Trader's Name"
                id="name"
                text="Name of the person receiving the trade"
                changeHandler={onChangeValue}
            />
            
            <FormGroup>
                <ControlLabel>Picking</ControlLabel>
                <HelpBlock>
                    Resources you are purchasing.
                </HelpBlock>
                
                <Form inline>
                    <ResourceField
                        id="bWater"
                        text="Water"
                        glyph="tint"
                        changeHandler={onChangeValue}
                        validationHandler={handleValidation.resourceValidation}
                    />
                    
                    <ResourceField
                        id="bFood"
                        text="Food"
                        glyph="cutlery"
                        changeHandler={onChangeValue}
                        validationHandler={handleValidation.resourceValidation}
                    />
                    
                    <ResourceField
                        id="bMedication"
                        text="Medication"
                        glyph="plus"
                        changeHandler={onChangeValue}
                        validationHandler={handleValidation.resourceValidation}
                    />
                    
                    <ResourceField
                        id="bAmmunition"
                        text="Ammunition"
                        glyph="fire"
                        changeHandler={onChangeValue}
                        validationHandler={handleValidation.resourceValidation}
                    />
                </Form>
            </FormGroup>
                
            <FormGroup>
                <ControlLabel>Payment</ControlLabel>
                <HelpBlock>
                    Resources you are paying
                </HelpBlock>
                
                <Form inline>
                    <ResourceField
                        id="pWater"
                        text="Water"
                        glyph="tint"
                        changeHandler={onChangeValue}
                        validationHandler={handleValidation.resourceValidation}
                    />
                    
                    <ResourceField
                        id="pFood"
                        text="Food"
                        glyph="cutlery"
                        changeHandler={onChangeValue}
                        validationHandler={handleValidation.resourceValidation}
                    />
                    
                    <ResourceField
                        id="pMedication"
                        text="Medication"
                        glyph="plus"
                        changeHandler={onChangeValue}
                        validationHandler={handleValidation.resourceValidation}
                    />
                    
                    <ResourceField
                        id="pAmmunition"
                        text="Ammunition"
                        glyph="fire"
                        changeHandler={onChangeValue}
                        validationHandler={handleValidation.resourceValidation}
                    />
                </Form>
            </FormGroup>
            
            <FormGroup
                validationState={handleValidation.pointsValidation()}
            >
                <Table responsive>
                    <thead>
                        <tr>
                            <th><ControlLabel>Picking</ControlLabel></th>
                            <th><ControlLabel>Payment</ControlLabel></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{props.buying}</td>
                            <td>{props.paying}</td>
                        </tr>
                    </tbody>
                </Table>
            </FormGroup>
            
            <div className="text-center">
                <Button 
                    bsStyle="success"
                    onClick={props.onTrade}
                    bsSize="large"
                >
                    Trade
                </Button>
            </div>
         </div>
    );
};


export default TradeForm;