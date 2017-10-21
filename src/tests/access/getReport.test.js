import {expect} from 'chai';
import { getReport } from './../../rest/access';

describe('API getReport request test', () => {
    
    describe(' Infected Respot test', () => {
        it('Performs getReport(infected)', () => {
            return  getReport(
                "infected",
                (response, body) => {
                    expect(response.statusCode).to.eql(200);
                    expect(body).to.have.property('report');
                    expect(body.report).to.have.property('description');
                    expect(body.report.description).to.be.ok;
                    expect(body.report).to.have.property('average_infected');
                    expect(body.report.average_infected).to.be.ok;
                }
            );
        });
    });
    
    describe(' Helthy Respot test', () => {
        it('Performs getReport(non infected)', () => {
            return  getReport(
                "non infected",
                (response, body) => {
                    expect(response.statusCode).to.eql(200);
                    expect(body).to.have.property('report');
                    expect(body.report).to.have.property('description');
                    expect(body.report.description).to.be.ok;
                    expect(body.report).to.have.property('average_healthy');
                    expect(body.report.average_healthy).to.be.ok;
                }
            );
        });
    });
    
    describe(' People Inventory Respot test', () => {
        it('Performs getReport(inventory)', () => {
            return  getReport(
                "inventory",
                (response, body) => {
                    expect(response.statusCode).to.eql(200);
                    expect(body).to.have.property('report');
                    expect(body.report).to.have.property('description');
                    expect(body.report.description).to.be.ok;
                    expect(body.report).to.have.property('average_items_quantity_per_person');
                    expect(body.report.average_items_quantity_per_person).to.be.ok;
                    expect(body.report).to.have.property('average_items_quantity_per_healthy_person');
                    expect(body.report.average_items_quantity_per_healthy_person).to.be.ok;
                }
            );
        });
    });
    
    describe(' Lost Poits Respot test', () => {
        it('Performs getReport(lost points)', () => {
            return  getReport(
                "lost points",
                (response, body) => {
                    expect(response.statusCode).to.eql(200);
                    expect(body).to.have.property('report');
                    expect(body.report).to.have.property('description');
                    expect(body.report.description).to.be.ok;
                    expect(body.report).to.have.property('total_points_lost');
                    expect(body.report.total_points_lost).to.be.ok;
                }
            );
        });
    });
    
    describe(' Available Respots test', () => {
        it('Performs getReport()', () => {
            const expectedResponse = [
                  "http://zssn-backend-example.herokuapp.com/api/report/infected",
                  "http://zssn-backend-example.herokuapp.com/api/report/non_infected",
                  "http://zssn-backend-example.herokuapp.com/api/report/people_inventory",
                  "http://zssn-backend-example.herokuapp.com/api/report/infected_points"
            ];
            return  getReport(
                "",
                (response, body) => {
                    expect(response.statusCode).to.eql(200);
                    expect(body).to.be.eql(expectedResponse);
                }
            );
        });
    });
}); 