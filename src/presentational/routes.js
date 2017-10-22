import React from 'react';
import { Route } from 'react-router-dom'

import PersonFormContainer from './../container/personFormContainer';
import ReportForm from './reportForm';
// import SinglePersonForm from './getPersonForm';
// import GetReportForm from './getReportForm';
import TradeForm from './tradeForm';
// import PropertiesForm from './propertiesForm';
import UpdateForm from './updateForm';

const Routes = () => {
    return(
        <div>
            <Route exact path="/"/>
            <Route path="/signup" component={PersonFormContainer}/>
            <Route path="/reportinfection" component={ReportForm}/>
            <Route path="/update" component={UpdateForm}/>
            <Route path="/trade" component={TradeForm}/>
        </div>
    );
};

export default Routes;