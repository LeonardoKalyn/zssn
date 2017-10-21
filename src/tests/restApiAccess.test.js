import {expect} from 'chai';
import nock from 'nock';
import { simpleGet, simplePost, simplePatch } from './../rest/restApiAccess';

const URL = "http://testingurl.com";

const responseTest = (dataText) => {
    return (response, body) => {
        const data = JSON.parse(body);
        expect(data).to.be.ok;
        expect(data).to.have.property("text");
        
        const {text} = data;
        expect(text).to.be.ok;
        expect(text).to.be.a('string');
        expect(text).to.eql(dataText);
    };
};

describe('Connection simpleGet test', () => {
    const path = '/getpath';
    const dataText = 'Successfull GET';
    beforeEach(() => {
        nock(URL, {allowUnmocked: true})
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
    const path = "/postpath";
    const dataText = "Successfull POST";
    beforeEach(() => {
        nock(URL, {allowUnmocked: true})
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
    const path = "/patchpath";
    const dataText = "Successfull PATCH";
    beforeEach(() => {
        nock(URL, {allowUnmocked: true})
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