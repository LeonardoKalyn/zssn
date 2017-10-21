import {expect} from 'chai';
import { getSinglePerson } from './../../rest/access';

describe('API GetAllPeople request test', () => {
    it('Performs getAllPeople', () => {
        return  getSinglePerson(
            "cfee847c-03f1-4fe0-b6c4-a82c9f2bba82",
            (response, body) => {
                expect(response.statusCode).to.eql(200);
                expect(body).to.have.property('id');
                expect(body).to.have.property('name');
                expect(body).to.have.property('gender');
                expect(body).to.have.property('lonlat');
                expect(body).to.have.property('created_at');
                expect(body).to.have.property('updated_at');
            }
        );
    });
}); 