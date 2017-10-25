import {expect} from 'chai';
import getAllPeople from './../../rest/getAllPeople';

describe('API GetAllPeople request test', () => {
    it('Performs getAllPeople', () => {
        return  getAllPeople(
            (successful, body) => {
                expect(successful).to.be.ok;
                expect(body).to.be.an("array");
                expect(body).to.not.be.empty;
            }
        );
    });
}); 