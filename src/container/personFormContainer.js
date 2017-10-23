import React from 'react';
import submitNewPerson from './../rest/submitNewPerson';
import PersonForm from './../presentational/personForm';
import {withRouter} from 'react-router';

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
        
        this.validationLogic.name = this.validationLogic.name.bind(this);
        this.validationLogic.age = this.validationLogic.age.bind(this);
        this.validationLogic.gender = this.validationLogic.gender.bind(this);
        this.validationLogic.location = this.validationLogic.location.bind(this);
        this.validationLogic.resource = this.validationLogic.resource.bind(this);
        
        this.formValidation = this.formValidation.bind(this);
        
        this.handleValidationState.nameValidation = this.handleValidationState.nameValidation.bind(this);
        this.handleValidationState.ageValidation = this.handleValidationState.ageValidation.bind(this);
        this.handleValidationState.genderValidation = this.handleValidationState.genderValidation.bind(this);
        this.handleValidationState.locationValidation = this.handleValidationState.locationValidation.bind(this);
        this.handleValidationState.resourceValidation = this.handleValidationState.resourceValidation.bind(this);
        
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
            case 'lonlat':
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
    
    validationLogic = {
        
        numberValidation: (number) => {
            const numberString = number.toString();
            
            return (
                (number>=0) &&
                (numberString !== '') &&
                (/^\d+$/.test(numberString)) //Only contain numbers
            );
        },
        
        name: () => this.state.person.name !== '',
        
        age: () => this.validationLogic.numberValidation(this.state.person.age),
        
        gender: () => {
            const gender = this.state.person.gender;
            return (gender === 'M') || (gender === 'F');
        },
        
        location: () => (
            (this.state.person.lonlat === '') || 
            (/^-?\d+\.?\d+,-?\d+\.?\d+$/.test(this.state.person.lonlat)) // On format 'latitude,longitude'
        ),
        
        resource: (resourceName) => 
            this.validationLogic.numberValidation(this.state.items[resourceName]),
        
    }
    
    handleValidationState = {
        nameValidation: () =>
            this.validationLogic.name() ? 'success' : 'error',
        
        ageValidation:() =>
            this.validationLogic.age() ? 'success' : 'error',
        
        genderValidation: () =>
            this.validationLogic.gender() ? 'success' : 'error',
        
        locationValidation: () => {
            if(this.state.person.lonlat === '')
                return null;
            else 
                return this.validationLogic.location() ? 'success' : 'error';
        },
        
        resourceValidation: (resourceName) => {
            if(this.state.items[resourceName] === 0)
                return null;
            else 
                return this.validationLogic.resource(resourceName) ? 'success' : 'error';
        },
    }
    
    formValidation = () =>{
        if(!this.validationLogic.name()){
            window.alert('Name is required!');
            document.getElementById("name").focus();
            return false;
        }
            
        if(!this.validationLogic.age()){
            window.alert('A valid age is required!');
            document.getElementById("age").focus();
            return false;
        }
            
        if(!this.validationLogic.gender()){
            window.alert('Gender is required!');
            document.getElementById("gender").focus();
            return false;
        }
            
        if(!this.validationLogic.location()){
            window.alert(
                'Invalid form of location!\n' +
                'The location should be your current coordinates: "longitude,latitude".' + 
                'If you dont know your coordinates leave it blank.');
            document.getElementById("lonlat").focus();
            return false;
        }
            
        if(!this.validationLogic.resource('Water')){
            window.alert('Your Water resource is invalid');
            document.getElementById('Water').focus();
            return false;
        }
        
        if(!this.validationLogic.resource('Food')){
            window.alert('Your Food resourcer is invalid!');
            document.getElementById('Food').focus();
            return false;
        }
        
        if(!this.validationLogic.resource('Medication')){
            window.alert('Medication is invalid!');
            document.getElementById("Medication").focus();
            return false;
        }
            
        if(!this.validationLogic.resource('Ammunition')){
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
            PersonForm(
                this.handleChange,
                this.handleSaveClick,
                this.handleValidationState
            )
        );
    }
}

export default withRouter(PersonFormContainer);