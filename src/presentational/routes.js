import React from 'react';
import { Route } from 'react-router-dom'
import {Well} from 'react-bootstrap';

import PersonFormContainer from './../container/personFormContainer';
import ReportFormContainer from './../container/reportFormContainer';
import TradeFormContainer from './../container/tradeFormContainer';
import UpdateFormContainer from './../container/updateFormContainer';
import Home from './../presentational/statistics';


const Routes = () => {
    return(
        <div>
            <Well>
            <Route exact path="/" component={Home}/>
            <Route path="/signup" component={PersonFormContainer}/>
            <Route path="/reportinfection" component={ReportFormContainer}/>
            <Route path="/update" component={UpdateFormContainer}/>
            <Route path="/trade" component={TradeFormContainer}/>
            </Well>
        </div>
    );
};

export default Routes;