import React from 'react';
import { postNewPerson } from './../rest/access';
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
        this.validationLogic.formValidation = this.validationLogic.formValidation.bind(this);
        
        this.handleValidation.nameValidation = this.handleValidation.nameValidation.bind(this);
        this.handleValidation.ageValidation = this.handleValidation.ageValidation.bind(this);
        this.handleValidation.genderValidation = this.handleValidation.genderValidation.bind(this);
        this.handleValidation.locationValidation = this.handleValidation.locationValidation.bind(this);
        this.handleValidation.resourceValidation = this.handleValidation.resourceValidation.bind(this);
        
        this.submitForm = this.submitForm.bind(this);
        this.handleSaveClick = this.handleSaveClick.bind(this);
    }

    handleChange(event) {
        const changeHandler = (target) => {
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
        name: () => this.state.person.name !== '',
        
        age: () => this.state.person.age >= 0,
        
        gender: () => {
            const gender = this.state.person.gender;
            return (gender === 'M') || (gender === 'F');
        },
        
        location: () => ((this.state.person.lonlat === '') || (/^-?\d+\.\d+,-?\d+\.\d+$/.test(this.state.person.lonlat))),
        
        resource: (resourceName) => this.state.items[resourceName] >= 0,
        
        formValidation: () =>{
            if(!this.validationLogic.name()){
                window.alert('Name is required!');
                return false;
            }
                
            if(!this.validationLogic.age()){
                window.alert('A valid age is required!');
                return false;
            }
                
            if(!this.validationLogic.gender()){
                window.alert('Gender is required!');
                return false;
            }
                
            if(!this.validationLogic.location()){
                window.alert(
                    'Invalid form of location!\n' +
                    'The input should be your current coordinates: "longitude,latitude".' + 
                    'If you dont know your coordinates leave it blank.');
                return false;
            }
                
            if(!this.validationLogic.resource('Water') || !this.validationLogic.resource('Food') ||
                !this.validationLogic.resource('Ammunition') || !this.validationLogic.resource('Medication')){
                
                window.alert('Your resources cant be negative!');
                return false;
            }
            
            return true;
        }
        
    }
    
    handleValidation = {
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
        
        postNewPerson(
            newPerson,
            (response, body) => {
                if(response.statusCode === 201){
                   window.alert('Registration Succeded!\n'
                   + 'This is your id: ' + JSON.parse(body).id 
                   + '\nIt is important to save your id.');
                   this.props.history.push('/');
                }
                else {
                    window.alert('Registration Failed!\n'
                    + 'This response came from the server: \n'
                    + response.body);
                }
            }
        );
        
        
        
    }
    
    handleSaveClick() {
        if(this.validationLogic.formValidation())
            this.submitForm();
    }
    
    render() {
        return (
            PersonForm(
                this.handleChange,
                this.handleSaveClick,
                this.handleValidation
            )
        );
    }
}

export default withRouter(PersonFormContainer);