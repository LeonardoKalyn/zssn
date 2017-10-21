import {expect} from 'chai';
import {v4} from 'uuid';
import { postNewPerson } from './../../rest/access';

describe('API postNewPerson request test', () => {
    
    it('Performs a valid postNewPerson', () => {
        const name = v4().concat('newPerson');
        return  postNewPerson(
            {
                person: {
                    name: name,
                    age: 21,
                    gender: 'F',
                    lonlat: '',
                },
                items: 'Ammunition:0',
            },
            (response, body) => {
                body = JSON.parse(body);
                expect(response.statusCode).to.eql(201);
                expect(body).to.have.property('id');
                expect(body).to.have.property('name');
                expect(body.name).to.be.eql(name);
                expect(body).to.have.property('gender');
                expect(body.gender).to.be.eql('F');
                expect(body).to.have.property('lonlat');
                expect(body).to.have.property('created_at');
                expect(body).to.have.property('updated_at');
            }
        );
    });
});