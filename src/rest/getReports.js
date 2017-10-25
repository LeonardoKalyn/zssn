import {simpleGet} from './restApiAccess';
import * as URL from './url';

export const requestInfected = (callback) => {
    simpleGet(
        URL.getInfectedURL(),
        (response, body) => {
            body = JSON.parse(body);
            callback(body.report.average_infected*100);
        }
    );
};

export const requestNonInfected = (callback) =>{
    simpleGet(
        URL.getNonInfectedURL(),
        (response, body) => {
            body = JSON.parse(body);
            callback(body.report.average_healthy*100);
        }
    );
};

export const requestInventory = (callback) =>{
    simpleGet(
        URL.getInventoryURL(),
        (response, body) => {
            body = JSON.parse(body);
            callback({
                perPerson: body.report.average_items_quantity_per_person,
                perHelthyPerson: body.report.average_items_quantity_per_healthy_person
            });
        }
    );
};

export const requestLostPoints = (callback) =>{
    simpleGet(
        URL.getInfectedPointsURL(),
        (response, body) => {
            body = JSON.parse(body);
            callback(body.report.total_points_lost);
        }
    );
};

const requestAvailableReports = (callback) => {
    simpleGet(
        URL.getAvailableReportsURL(),
        (response, body) => {
            callback(JSON.parse(body));
        }
    );
};

export default requestAvailableReports;