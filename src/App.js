import React from 'react';
import { getAllPeople } from './rest/backend';
import PersonForm from './personForm';
import ReportForm from './reportForm';
import SinglePersonForm from './getPersonForm';
import GetReportForm from './getReportForm';
import TradeForm from './tradeForm';
import PropertiesForm from './propertiesForm';
import UpdateForm from './updateForm';

const App = () => {
  
  return (
    <div>
      <h1>ZSSN</h1>
      <h3>Properties</h3>
      <TradeForm />
      <PropertiesForm />
      
      <h3>People</h3>
      <button onClick={() =>getAllPeople(console.log)}> Get All People </button>
      <PersonForm/>
      <ReportForm/>
      <SinglePersonForm />
      <UpdateForm />
      
      <h3>Report</h3>
      <GetReportForm />
    </div>
  );
};

export default App;