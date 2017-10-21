import {expect} from 'chai';
import {v4} from 'uuid';
import { updatePerson } from './../../rest/access';

describe('API postNewPerson request test', () => {
    
    it('Performs a valid postNewPerson', () => {
        const name = v4().concat('update');
        return updatePerson(
            {
                id: '94710ac3-ac65-418b-8d61-a92c9d1096cb',
                person: {
                    name: name,
                    age: 21,
                    gender: 'M',
                    lonlat: '',
                },
            },
            (response, body) => {
                body = JSON.parse(body);
                expect(response.statusCode).to.eql(200);
                expect(body).to.have.property('id');
                expect(body).to.have.property('name');
                expect(body.name).to.be.eql(name);
                expect(body).to.have.property('gender');
                expect(body.gender).to.be.eql('M');
                expect(body).to.have.property('lonlat');
                expect(body).to.have.property('created_at');
                expect(body).to.have.property('updated_at');
            }
        );
    });
});