import {expect} from 'chai';
import nock from 'nock';
import { simpleGet, simplePost, simplePatch } from './../rest/restApiAccess';

const URL = "http://zssn-backend-example.herokuapp.com";

const responseTest = (dataText) => {
    return (responseText) => {
        const response = JSON.parse(responseText);
        expect(response).to.be.ok;
        expect(response).to.have.property("text");
        
        const {text} = response;
        expect(text).to.be.ok;
        expect(text).to.be.a('string');
        expect(text).to.eql(dataText);
    };
};

describe('Connection simpleGet test', () => {
    const path = '/api/people.json';
    const dataText = 'Successfull GET';
    beforeEach(() => {
        nock(URL)
            .get(path)
            .reply(
                200, 
                {text: dataText}
            );
    });
    it('Sends a HTTP GET request', () => {
        return simpleGet(
            URL.concat(path),
            responseTest(dataText)
        );
    });
});

describe('Connection simplePost test', () => {
    const path = "/api/people/id/report_infection.json";
    const dataText = "Successfull POST";
    beforeEach(() => {
        nock(URL)
            .post(
                path,
                {text: dataText}
            )
            .reply(
                200, 
                {text: dataText}
            );
    });
    it('Sends a HTTP POST request', () => {
        return simplePost(
            URL.concat(path),
            {text: dataText},
            responseTest(dataText)
        );
    });
});

describe('Connection simplePatch test', () => {
    const path = "/api/people/id.json";
    const dataText = "Successfull PATCH";
    beforeEach(() => {
        nock(URL)
            .intercept(
                path,
                'PATCH',
                {text: dataText}
            )
            .reply(
                200, 
                {text: dataText}
            );
    });
    it('Sends a HTTP PATCH request', () => {
        return simplePatch(
            URL.concat(path),
            {text: dataText},
            responseTest(dataText)
        );
    });
});