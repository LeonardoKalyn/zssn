import {expect} from 'chai';
import { getAllPeople } from './../../rest/access';

describe('API GetAllPeople request test', () => {
    it('Performs getAllPeople', () => {
        return  getAllPeople(
            (response, body) => {
                expect(response.statusCode).to.eql(200);
                expect(body).to.be.an("array");
                expect(body).to.not.be.empty;
            }
        );
    });
}); 