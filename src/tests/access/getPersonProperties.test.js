import {expect} from 'chai';
import { getPersonProperties } from './../../rest/access';

describe('API GetAllPeople request test', () => {
    it('Performs getAllPeople', () => {
        return  getPersonProperties(
            "cfee847c-03f1-4fe0-b6c4-a82c9f2bba82",
            (response, body) => {
                expect(response.statusCode).to.eql(200);
                expect(body).to.be.an("array");
                expect(body).to.not.be.empty;
            }
        );
    });
}); 