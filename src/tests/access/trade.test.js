import { trade } from './../../rest/properties';
import { expect } from 'chai';

describe('API trade request test', () => {
    
    it('Performs a valid trade', () => {
        const tradeData = {
            id: 'cfee847c-03f1-4fe0-b6c4-a82c9f2bba82',
            consumer: {
                name: 'Kalyn Teste1',
                pick: 'Water:1',
                payment: 'Ammunition:4',
            },
        };
        return trade(
            tradeData,
            (successful, statusCodey) => {
                expect(successful).to.be.ok;
            }
        );
    });
    
    it('Performs an invalid trade', () => {
        const tradeData = {
            id: 'cfee847c-03f1-4fe0-b6c4-a82c9f2bba82',
            consumer: {
                name: 'Kalyn Teste1',
                pick: 'Food:1', //doesn't have food
                payment: 'Ammunition:3',
            },
        };
        return trade(
            tradeData,
            (sucessfull, statusCode) => {
                expect(sucessfull.statusCode).to.not.be.ok;
            }
        );
    });
    
    it('Performs an unacceptable trade', () => {
        const tradeData = {
            id: 'cfee847c-03f1-4fe0-b6c4-a82c9f2bba82',
            consumer: {
                name: 'Kalyn',
                pick: 'Water:3',
                payment: 'Ammunition:1',
            },
        };
        return trade(
            tradeData,
            (successful, statusCode) => {
                expect(successful).to.not.be.ok;
            }
        );
    });
    
    it('Performs a trade with an invalid id', () => {
        const tradeData = {
            id: 'invalid id',
            consumer: {
                name: 'Kalyn Teste1',
                pick: 'Water:1',
                payment: 'Ammunition:4',
            },
        };
        return trade(
            tradeData,
            (sucessfull, statusCode) => {
                expect(sucessfull).to.not.be.ok;
            }
        );
    });
});
