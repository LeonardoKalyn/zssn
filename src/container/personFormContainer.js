import React from 'react';
import submitNewPerson from './../rest/submitNewPerson';
import PersonForm from './../presentational/personForm';
import PersonAlert from './personAlertContainer';
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
            
            popup: 'none',
            adicionalData: null,
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.dismissPopup = this.dismissPopup.bind(this);
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
    
    dismissPopup(){
         this.setState({
             ...this.state,
             popup: 'none',
         });
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
            (this.state.person.age > 1) && (validationLogic.validateNumber(this.state.person.age)) ?
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
            this.setState({
                ...this.state,
                popup: "invalid name"
            });
            return false;
        }
            
        if(this.state.person.age <= 1 || !validationLogic.validateNumber(this.state.person.age)){
            this.setState({
                ...this.state,
                popup: 'invalid age'
            });
            return false;
        }
            
        if(!validationLogic.validateGender(this.state.person.gender)){
            this.setState({
                ...this.state,
                popup: 'invalid gender'
            });
            return false;
        }
            
        if(!validationLogic.validateLocation(this.state.person.lonlat)){
            this.setState({
                ...this.state,
                popup:'invalid location'
            });
            return false;
        }
            
        if(!validationLogic.validateNumber(this.state.items.Water)){
            this.setState({
                ...this.state,
                popup:'invalid Water'
            });
            return false;
        }
        
        if(!validationLogic.validateNumber(this.state.items.Food)){
            this.setState({
                ...this.state,
                popup:'invalid Food'
            });
            return false;
        }
        
        if(!validationLogic.validateNumber(this.state.items.Medication)){
            this.setState({
                ...this.state,
                popup:'invalid Medication'
            });
            return false;
        }
            
        if(!validationLogic.validateNumber(this.state.items.Ammunition)){
            this.setState({
                ...this.state,
                popup:'invalid Ammunition'
            });
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
                    this.setState({
                        ...this.state,
                        popup:'successful sign up',
                        adicionalData: body.id,
                    });
                }
                else {
                    console.log(body);
                    this.setState({
                        ...this.state,
                        popup:'failed to sign up',
                        adicionalData: body,
                    });
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
            <div>
                <PersonAlert
                    popup= {this.state.popup}
                    dismissPopup={this.dismissPopup}
                    adicionalData={this.state.adicionalData}
                />
                <PersonForm
                    onChangeValue={this.handleChange}
                    onSaveClick={this.handleSaveClick}
                    handleValidation={this.handleValidationState}
                    returnLocation={this.returnLocation}
                />
            </div>
        );
    }
}

export default withRouter(PersonFormContainer);