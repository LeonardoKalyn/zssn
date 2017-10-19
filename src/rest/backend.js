import request from 'request';

const URL = () => "http://zssn-backend-example.herokuapp.com";

const tradeURL = (id) => URL().concat("/api/people/", id, "/properties/trade_item.json");
const propertiesURL = (id) => URL().concat("/api/people/", id,"/properties.json");

const personURL = () => URL().concat("/api/people.json");
const infectedURL = (id) => URL().concat("/api/people/", id, "/report_infection.json");
const personIdURL = (id) => URL().concat("/api/people/", id, ".json");

const getInfectedURL = () => URL().concat("/api/report/infected.json");
const getNonInfectedURL = () => URL().concat("/api/report/non_infected.json");
const getInventoryURL = () => URL().concat("/api/report/people_inventory.json");
const getInfectedPoints = () => URL().concat("/api/report/infected_points.json");
const getAvailableReports = () => URL().concat("/api/report.json");

const simpleGet = (url, callback) => {
    request(
        url, 
        (err, response, body) => {
            if(err){
                console.log(err);
                return;
            }
            callback(JSON.parse(body));
        });
};

const simplePost = (url, data, callback) => {
    request.post(
        {
            url: url, 
            form:{...data}
        },
        (err, response, body)=>{
            if(err){
                console.log(err);
                return;
            }
            callback(body);
        }
    );
};

const simplePatch = (url, data, callback) => {
    request.patch(
        {
            url: url, 
            form:{...data}
        },
        (err, response, body)=>{
            if(err){
                console.log(err);
                return;
            }
            callback(body);
        }
    );
};

export const trade = (data, callback) => {
    const {id, ...rest} = data;
    simplePost(
        tradeURL(id),
        rest,
        callback
    );
};

export const getPersonProperties = (id, callback) => {
    simpleGet(
        propertiesURL(id),
        callback
    );
};

export const getAllPeople = (callback) => {
    simpleGet(
        personURL(),
        callback
    );
};

export const postNewPerson = (newPerson, callback) => {
    simplePost(
        personURL(),
        newPerson,
        callback
    );
};

export const reportInfected = (data, callback) => {
    simplePost(
        infectedURL(data.id),
        {infected: data.infected},
        callback
    );
};

export const getSinglePerson = (id, callback) => {
    simpleGet(
        personIdURL(id),
        callback
    );
};

export const updatePerson = (person, callback) => {
    const {id, ...rest} = person;
    simplePatch(
        personIdURL(id),
        rest,
        callback
    );
};

export const getReport = (reportName, callback) => {
    switch(reportName){
        case 'infected':
            simpleGet(getInfectedURL(), callback);
            break;
        case 'non infected':
            simpleGet(getNonInfectedURL(), callback);
            break;
        case 'inventory':
            simpleGet(getInventoryURL(), callback);
            break;
        case 'lost points':
            simpleGet(getInfectedPoints(), callback);
            break;
        default:
            simpleGet(getAvailableReports(), callback);
    }
};