import {expect} from 'chai';
import { getSinglePerson } from './../../rest/updatePerson';

describe('API GetSinglePerson request test', () => {
    it('Performs getSinglePerson with valid Id', () => {
        return  getSinglePerson(
            "cfee847c-03f1-4fe0-b6c4-a82c9f2bba82",
            (successful, body) => {
                expect(successful).to.be.ok;
                expect(body).to.have.property('id');
                expect(body).to.have.property('name');
                expect(body).to.have.property('gender');
                expect(body).to.have.property('lonlat');
                expect(body).to.have.property('created_at');
                expect(body).to.have.property('updated_at');
            }
        );
    });
    
    it('Performs getSinglePerson with invalid Id', () => {
        return  getSinglePerson(
            "invalid id",
            (successful, body) => {
                expect(successful).to.not.be.ok;
            }
        );
    });
}); 