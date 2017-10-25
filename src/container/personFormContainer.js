import React from 'react';
import submitNewPerson from './../rest/submitNewPerson';
import PersonForm from './../presentational/personForm';
import {withRouter} from 'react-router';
import * as validationLogic from './personValidationLogic';

class PersonFormContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            person: {
                name: '',
                age: -1,
                gender: '',
                lonlat: '',
            },
            items: {
                Water: 0,
                Food: 0,
                Medication: 0,
                Ammunition: 0,
            },
        };
        
        this.handleChange = this.handleChange.bind(this);
        
        this.formValidation = this.formValidation.bind(this);
        
        this.handleValidationState.nameValidation = this.handleValidationState.nameValidation.bind(this);
        this.handleValidationState.ageValidation = this.handleValidationState.ageValidation.bind(this);
        this.handleValidationState.genderValidation = this.handleValidationState.genderValidation.bind(this);
        this.handleValidationState.locationValidation = this.handleValidationState.locationValidation.bind(this);
        this.handleValidationState.resourceValidation = this.handleValidationState.resourceValidation.bind(this);
        
        this.returnLocation = this.returnLocation.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.handleSaveClick = this.handleSaveClick.bind(this);
    }

    handleChange(event) {
        const changeHandler = (target) => {
            if(
                (event.target.id === 'age' || target === 'items') &&
                (event.target.value === '')
            )
                event.target.value = 0;
            this.setState({
                ...this.state,
                [target]: {
                    ...this.state[target],
                    [event.target.id]: event.target.value
                }
            });
        };
        
        switch (event.target.id) {
            case 'name':
            case 'age':
            case 'gender':
                changeHandler("person");
                break;
            case 'Water':
            case 'Food':
            case 'Medication':
            case 'Ammunition':
                changeHandler("items");
                break;
            default:
                console.log("Unknow target:" + event.target.name);
        }
    }
    
    returnLocation(lonlat) {
        this.setState({
                ...this.state,
                person: {
                    ...this.state.person,
                    lonlat: "".concat(lonlat.lat, ',', lonlat.lon)
                }
            });
    }
    
    handleValidationState = {
        nameValidation: () =>
            validationLogic.validateName(this.state.person.name) ?
                'success' : 'error',
        
        ageValidation:() =>
            validationLogic.validateNumber(this.state.person.age) ?
                'success' : 'error',
        
        genderValidation: () =>
            validationLogic.validateGender(this.state.person.gender) ?
                'success' : 'error',
        
        locationValidation: () => {
            const location = this.state.person.lonlat;
            if(location  === '')
                return null;
            else 
                return validationLogic.validateLocation(location) ?
                    'success' : 'error';
        },
        
        resourceValidation: (resourceName) => {
            const resource = this.state.items[resourceName];
            if(resource === 0)
                return null;
            else 
                return validationLogic.validateNumber(resource) ? 
                'success' : 'error';
        },
    }
    
    formValidation = () =>{
        if(!validationLogic.validateName(this.state.person.name)){
            window.alert('Name is required!');
            document.getElementById("name").focus();
            return false;
        }
            
        if(!validationLogic.validateNumber(this.state.person.age)){
            window.alert('A valid age is required!');
            document.getElementById("age").focus();
            return false;
        }
            
        if(!validationLogic.validateGender(this.state.person.gender)){
            window.alert('Gender is required!');
            document.getElementById("gender").focus();
            return false;
        }
            
        if(!validationLogic.validateLocation(this.state.person.lonlat)){
            window.alert(
                'Invalid location!');
            document.getElementById("lonlat").focus();
            return false;
        }
            
        if(!validationLogic.validateNumber(this.state.items.Water)){
            window.alert('Your Water resource is invalid');
            document.getElementById('Water').focus();
            return false;
        }
        
        if(!validationLogic.validateNumber(this.state.items.Food)){
            window.alert('Your Food resourcer is invalid!');
            document.getElementById('Food').focus();
            return false;
        }
        
        if(!validationLogic.validateNumber(this.state.items.Medication)){
            window.alert('Medication is invalid!');
            document.getElementById("Medication").focus();
            return false;
        }
            
        if(!validationLogic.validateNumber(this.state.items.Ammunition)){
            window.alert('Your Ammunition resource is invalid');
            document.getElementById('Ammunition').focus();
            return false;
        }
        
        return true;
    }
    
    submitForm() {
        const mapPerson = () => {
            const {lonlat, ...rest} = this.state.person;
            return lonlat !== '' ? 
                {
                    lonlat: 'point('.concat(lonlat,')'),
                    ...rest
                } : 
                {...rest};
        };
        const newPerson = {
            person: {...mapPerson()},
            items: JSON.stringify(this.state.items)
                .replace(/,/g, ';')
                .replace(/"/g, '')
                .replace('{', '')
                .replace('}', '')
        };
        
        submitNewPerson(
            newPerson,
            (successful, body) => {
                if(successful){
                   window.alert('Registration Succeded!\n'
                   + 'This is your id: ' + body.id 
                   + '\nIt is important to save your id.');
                   this.props.history.push('/');
                }
                else {
                    window.alert('Registration Failed!\n'
                    + 'This response came from the server: \n'
                    + body);
                }
            }
        );
    }
    
    handleSaveClick() {
        if(this.formValidation())
            this.submitForm();
    }
    
    render() {
        return (
            <PersonForm
                onChangeValue={this.handleChange}
                onSaveClick={this.handleSaveClick}
                handleValidation={this.handleValidationState}
                returnLocation={this.returnLocation}
            />
        );
    }
}

export default withRouter(PersonFormContainer);