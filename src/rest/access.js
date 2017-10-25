import { simpleGet, simplePost } from './restApiAccess';
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
