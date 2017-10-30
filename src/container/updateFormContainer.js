import React from 'react';
import {withRouter} from 'react-router';
import updatePerson, { getSinglePerson } from './../rest/updatePerson';
import UpdateForm from './../presentational/updateForm';
import UpdateAlert from './updateAlertContainer';
import * as validationLogic from './personValidationLogic';

class UpdateFormContainer extends React.Component {
    constructor(props) {
    super(props);
        this.state = {
            id: '',
            newPerson: {
                name: '',
                age: '',
                gender: '',
                lonlat: '',
            },
            oldPerson: {
                name: '',
                age: '',
                gender: '',
                lonlat: '',
            },
            
            popup: 'none'
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.dismissPopup = this.dismissPopup.bind(this);
        this.formValidation = this.formValidation.bind(this);
        
        this.handleValidationState.nameValidation = this.handleValidationState.nameValidation.bind(this);
        this.handleValidationState.ageValidation = this.handleValidationState.ageValidation.bind(this);
        this.handleValidationState.genderValidation = this.handleValidationState.genderValidation.bind(this);
        this.handleValidationState.locationValidation = this.handleValidationState.locationValidation.bind(this);

        this.returnLocation = this.returnLocation.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.loadOldPerson = this.loadOldPerson.bind(this);
        this.handleUpdateClick = this.handleUpdateClick.bind(this);
        this.handleCancelClick = this.handleCancelClick.bind(this);
    }

     handleChange(event) {
         if(event.target.id==="id") 
            this.setState({
                ...this.state,
                id: event.target.value
            });
         else {
            if((event.target.id === 'age') && (event.target.value === ''))
                event.target.value = 0;
                
            this.setState({
                ...this.state,
                newPerson: {
                    ...this.state.newPerson,
                    [event.target.id]: event.target.value
                }
            });
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
            newPerson: {
                ...this.state.newPerson,
                lonlat: "".concat(lonlat.lat, ',', lonlat.lon)
            }
        });
    }
     
    handleValidationState = {
        nameValidation: () =>
            validationLogic.validateName(this.state.newPerson.name) ?
                'success' : 'error',
        
        ageValidation:() =>
            validationLogic.validateNumber(this.state.newPerson.age) ?
                'success' : 'error',
        
        genderValidation: () =>
            validationLogic.validateGender(this.state.newPerson.gender) ?
                'success' : 'error',
        
        locationValidation: () => {
            const location = this.state.newPerson.lonlat;
            if(location  === '')
                return 'error';
            else 
                return validationLogic.validateLocation(location) ?
                    'success' : 'error';
        }
    }
    
    handleValidationState = {
        nameValidation: () =>
            validationLogic.validateName(this.state.newPerson.name) ?
                'success' : 'error',
        
        ageValidation:() =>
            validationLogic.validateNumber(this.state.newPerson.age) ?
                'success' : 'error',
        
        genderValidation: () =>
            validationLogic.validateGender(this.state.newPerson.gender) ?
                'success' : 'error',
        
        locationValidation: () => {
            const location = this.state.newPerson.lonlat;
            if(location  === '')
                return null;
            else 
                return validationLogic.validateLocation(location) ?
                    'success' : 'error';
        }
    }
    
    formValidation = () =>{
        if(!this.state.id){
            this.setState({
                ...this.state,
                popup: "empty id"
            });
            return false;
        }
        
        if(!validationLogic.validateName(this.state.newPerson.name)){
            this.setState({
                ...this.state,
                popup: "invalid name"
            });
            return false;
        }
            
        if(!validationLogic.validateNumber(this.state.newPerson.age)){
            this.setState({
                ...this.state,
                popup: 'invalid age'
            });
            return false;
        }
            
        if(!validationLogic.validateGender(this.state.newPerson.gender)){
            this.setState({
                ...this.state,
                popup: 'invalid gender'
            });
            return false;
        }
            
        if(!validationLogic.validateLocation(this.state.newPerson.lonlat)){
            this.setState({
                ...this.state,
                popup:'invalid location'
            });
            return false;
        }
        
        if( (JSON.stringify(this.state.newPerson)) ===
            (JSON.stringify(this.state.oldPerson))
        ){
            this.setState({
                ...this.state,
                popup: 'equal data'
                }
            );
            return false;
        }
        
        return true;
    }
    
    submitForm() {
        const newPerson = {
            id: this.state.id,
            person: {...this.state.newPerson},
        };
        
        updatePerson(
            newPerson,
            (successful, body) => {
                if(successful){
                    this.setState({
                        ...this.state,
                        popup: 'successful update'
                    });
                }
                else {
                    this.setState({
                        ...this.state,
                        popup: 'failed to update'
                    });
                }
            }
        );
    }
    
    loadOldPerson(){
        if(this.state.id){
            getSinglePerson(
                this.state.id,
                (successful, body) => {
                    if(successful){
                        this.setState({
                            ...this.state,
                            oldPerson:{
                                name: body.name,
                                age: body.age,
                                gender: body.gender,
                                lonlat: body.lonlat
                            },
                            newPerson:{
                                name: body.name,
                                age: body.age,
                                gender: body.gender,
                                lonlat: body.lonlat
                            }
                        });
                    }
                    else{
                        this.setState({
                            ...this.state,
                            popup: 'failed to fetch data'
                        });
                    }
                }
            );
        }
        else{
            this.setState({
                ...this.state,
                popup: 'empty id'
            });
        }
    }
    
    handleUpdateClick() {
        if(this.formValidation())
            this.submitForm();
    }
    
    handleCancelClick(){
        this.props.history.push('/');
    }
    
    render() {
        return (
            <div>
                <UpdateAlert 
                    popup={this.state.popup}
                    dismissPopup={this.dismissPopup}
                />
                <UpdateForm 
                    newPerson={this.state.newPerson}
                    onChangeValue={this.handleChange}
                    loadOldPerson={this.loadOldPerson}
                    onUpdateClick={this.handleUpdateClick}
                    onCancelClick={this.handleCancelClick}
                    handleValidation={this.handleValidationState}
                    returnLocation={this.returnLocation}
                />
            </div>
        );
    }
}

export default withRouter(UpdateFormContainer);