import {expect} from 'chai';
import {v4} from 'uuid';
import * as validationLogic from './../../container/personValidationLogic';

describe('Person fiels validation logic test', () => {
    describe ('Name Validation', () => {
        it('Tests a valid Name', () => {
            const name = v4();
            expect(validationLogic.validateName(name)).to.be.ok;
        });
        
        it('Tests a empty string Name', () => {
            expect(validationLogic.validateName('')).to.not.be.ok;
        });
        
        it('Tests a null Name', () => {
            expect(validationLogic.validateName(null)).to.not.be.ok;
        });
        
        it('Tests a undefined Name', () => {
            expect(validationLogic.validateName(undefined)).to.not.be.ok;
        });
    });
    
    describe('Number Validation (age and resources)', () => {
        
        it('Tests a positive number', () => {
            const number = Math.floor(Math.random()*10+1);
            expect(validationLogic.validateNumber(number)).to.be.ok;
        });
        
        it('Tests zero', () => {
            expect(validationLogic.validateNumber(0)).to.be.ok;
        });
        
        it('Tests a negative number', () => {
            const number = Math.floor(Math.random()*10-10);
            expect(validationLogic.validateNumber(number)).to.not.be.ok;
        });
        
        it('Tests a number with decimals', () => {
            let number = Math.random();
            number = number !== 0 ? number : 0.0001;
            expect(validationLogic.validateNumber(number)).to.not.be.ok;
        });
        
        it('Tests null as a number', () => {
            expect(validationLogic.validateNumber(null)).to.not.be.ok;
        });
        
        it('Tests undefined as a number', () => {
            expect(validationLogic.validateNumber(undefined)).to.not.be.ok;
        });
        
    });
    
    describe('Location Validation', () => {
        it('Tests a valid location', () => {
            const location = "".concat(
                Math.random()*2000000-1000000,
                ',',
                Math.random()*2000000-1000000
            );
            expect(validationLogic.validateLocation(location)).to.be.ok;
        });
        
        it('Tests a empty string location', () => {
            expect(validationLogic.validateLocation('')).to.be.ok;
        });
        
        it('Tests a null location', () => {
            expect(validationLogic.validateLocation(null)).to.not.be.ok;
        });
        
        it('Tests a undefined location', () => {
            expect(validationLogic.validateLocation(undefined)).to.not.be.ok;
        });
    });
    
    describe ('Gender Validation', () => {
        it('Tests male gender', () => {
            expect(validationLogic.validateGender('M')).to.be.ok;
        });
        
        it('Tests female gender', () => {
            expect(validationLogic.validateGender('F')).to.be.ok;
        });
        
        it('Tests empty string gender', () => {
            expect(validationLogic.validateGender('')).to.not.be.ok;
        });
        
        it('Tests null gender', () => {
            expect(validationLogic.validateGender(null)).to.not.be.ok;
        });
        
        it('Tests undefined gender', () => {
            expect(validationLogic.validateGender(undefined)).to.not.be.ok;
        });
    });
});