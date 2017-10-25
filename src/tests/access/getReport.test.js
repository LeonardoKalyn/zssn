import {expect} from 'chai';
import getAvailableReports, * as getReports from './../../rest/getReports';

describe('API getReport request test', () => {
    
    describe('Infected Report test', () => {
        it('Requests the average of infected people', () => {
            return  getReports.requestInfected(
                (infected) => {
                    expect(infected).to.be.a('number');
                }
            );
        });
    });
    
    describe('Non Infected Report test', () => {
        it('Requests the average of healthy people', () => {
            return  getReports.requestNonInfected(
                (healthy) => {
                    expect(healthy).to.be.a('number');
                }
            );
        });
    });
    
    describe('People Inventory Report test', () => {
        it('Requests the average of items per people, and per healty people', () => {
            return  getReports.requestInventory(
                (inventory) => {
                    expect(inventory).to.have.property('perPerson');
                    expect(inventory).to.have.property('perHelthyPerson');
                    expect(inventory.perPerson).to.be.a('number');
                    expect(inventory.perHelthyPerson).to.be.a('number');
                }
            );
        });
    });
    
    describe('Lost Points Report test', () => {
        it('Requests the total of points lost by infected people', () => {
            return  getReports.requestLostPoints(
                (lostPoints) => {
                    expect(lostPoints).to.be.a('number');
                }
            );
        });
    });
    
    describe('Available Respots test', () => {
        it('Requests all the available reports', () => {
            const expectedReports = [
                  "http://zssn-backend-example.herokuapp.com/api/report/infected",
                  "http://zssn-backend-example.herokuapp.com/api/report/non_infected",
                  "http://zssn-backend-example.herokuapp.com/api/report/people_inventory",
                  "http://zssn-backend-example.herokuapp.com/api/report/infected_points"
            ];
            return  getAvailableReports(
                (availableReports) => {
                    expect(availableReports).to.be.eql(expectedReports);
                }
            );
        });
    });
}); 