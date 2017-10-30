import React from 'react';
import { Button, Well } from 'react-bootstrap';
import CollapsablePanel from './../selfcontained/collapsablePanel';
import StandardFormField from './standardFormField';

const ReportForm =(props) =>{
    const {onChangeValue} = props; 
    return (
        <div>
            <h1>Report Infected User</h1>
            <Well bsSize="large">
                <CollapsablePanel btTitle="Instructions" btStyle="warning">
                    <h4>To report someone infect you need your id and the id of the person you suspect.</h4>
                    
                </CollapsablePanel>
                
                <StandardFormField
                    name="Infected Id"
                    id="infected"
                    text="The Id of the infected person"
                    value={props.infectedValue}
                    changeHandler={onChangeValue}
                />
                
                <StandardFormField
                    name="Your Id"
                    id="id"
                    text="Your Id"
                    value={props.id}
                    changeHandler={onChangeValue}
                />
                
                <div className="text-center">
                    <Button 
                        bsStyle="danger"
                        onClick={props.onReport}
                        bsSize="large"
                    >
                        Report Infetected
                    </Button>
                </div>
            </Well>
         </div>
    );
};

export default ReportForm;