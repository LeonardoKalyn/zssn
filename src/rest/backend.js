import { simpleGet, simplePost, simplePatch } from './restApiAccess';

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

const wrapCallback = (callback) => {
    return (response) => callback(JSON.parse(response));
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
        wrapCallback(callback)
    );
};

export const getAllPeople = (callback) => {
    simpleGet(
        personURL(),
        wrapCallback(callback)
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
        wrapCallback(callback)
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
    const wrappedCallback = wrapCallback(callback);
    switch(reportName){
        case 'infected':
            simpleGet(getInfectedURL(), wrappedCallback);
            break;
        case 'non infected':
            simpleGet(getNonInfectedURL(), wrappedCallback);
            break;
        case 'inventory':
            simpleGet(getInventoryURL(), wrappedCallback);
            break;
        case 'lost points':
            simpleGet(getInfectedPoints(), wrappedCallback);
            break;
        default:
            simpleGet(getAvailableReports(), wrappedCallback);
    }
};