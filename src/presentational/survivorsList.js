import React from 'react';
import {Well} from 'react-bootstrap';
import AccordeonList from './../selfcontained/accordeonList';

const SurvivorsListPage = (props) => {
    return (
        <div>
            <h1> Survivors List </h1>
            <Well>
                <AccordeonList />
            </Well>
        </div>
    );
};

export default SurvivorsListPage;