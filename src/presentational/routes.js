import React from 'react';
import { Route } from 'react-router-dom'

import PersonFormContainer from './../container/personFormContainer';
import ReportForm from './reportForm';
import TradeForm from './tradeForm';
import UpdateFormContainer from './../container/updateFormContainer';
import Home from './../presentational/statistics';


const Routes = () => {
    return(
        <div>
            <Route exact path="/" component={Home}/>
            <Route path="/signup" component={PersonFormContainer}/>
            <Route path="/reportinfection" component={ReportForm}/>
            <Route path="/update" component={UpdateFormContainer}/>
            <Route path="/trade" component={TradeForm}/>
        </div>
    );
};

export default Routes;