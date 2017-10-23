import { simpleGet, simplePost, simplePatch } from './restApiAccess';
import * as URL from './url';

const wrapCallback = (callback) => {
    return (response, body) => callback(response, JSON.parse(body));
};

export const trade = (data, callback) => {
    const {id, ...rest} = data;
    simplePost(
        URL.tradeURL(id),
        rest,
        callback
    );
};

export const getPersonProperties = (id, callback) => {
    simpleGet(
        URL.propertiesURL(id),
        wrapCallback(callback)
    );
};

export const getAllPeople = (callback) => {
    simpleGet(
        URL.personURL(),
        wrapCallback(callback)
    );
};

export const reportInfected = (data, callback) => {
    simplePost(
        URL.infectedURL(data.id),
        {infected: data.infected},
        callback
    );
};

export const getSinglePerson = (id, callback) => {
    simpleGet(
        URL.personIdURL(id),
        wrapCallback(callback)
    );
};

export const updatePerson = (person, callback) => {
    const {id, ...rest} = person;
    simplePatch(
        URL.personIdURL(id),
        rest,
        callback
    );
};

export const getReport = (reportName, callback) => {
    const wrappedCallback = wrapCallback(callback);
    switch(reportName){
        case 'infected':
            simpleGet(URL.getInfectedURL(), wrappedCallback);
            break;
        case 'non infected':
            simpleGet(URL.getNonInfectedURL(), wrappedCallback);
            break;
        case 'inventory':
            simpleGet(URL.getInventoryURL(), wrappedCallback);
            break;
        case 'lost points':
            simpleGet(URL.getInfectedPointsURL(), wrappedCallback);
            break;
        default:
            simpleGet(URL.getAvailableReportsURL(), wrappedCallback);
    }
};