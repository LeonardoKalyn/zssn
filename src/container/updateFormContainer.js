import React from 'react';
import updatePerson, { getSinglePerson } from './../rest/updatePerson';
import UpdateForm from './../presentational/updateForm';
import * as validationLogic from './personValidationLogic';

class UpdateFormContainer extends React.Component {
    constructor(props) {
    super(props);
        this.state = {
            id: '',
            newPerson: {
                name: '',
                age: -1,
                gender: '',
                lonlat: '',
            },
            oldPerson: {
                name: '',
                age: -1,
                gender: '',
                lonlat: '',
            }
        };
        
        this.handleChange = this.handleChange.bind(this);
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
        
        if(this.state.newPerson === this.state.oldPerson){
            window.alert("To update your data you must make "+
                "it different from the previous values." +
                "If you don't want to update just click cancel, " +
                "or move to another page.");
            document.getElementById("cancel").focus();
        }
        
        if(!validationLogic.validateName(this.state.newPerson.name)){
            window.alert('Name is required!');
            document.getElementById("name").focus();
            return false;
        }
            
        if(!validationLogic.validateNumber(this.state.newPerson.age)){
            window.alert('A valid age is required!');
            document.getElementById("age").focus();
            return false;
        }
            
        if(!validationLogic.validateGender(this.state.newPerson.gender)){
            window.alert('Gender is required!');
            document.getElementById("gender").focus();
            return false;
        }
            
        if(!validationLogic.validateLocation(this.state.newPerson.lonlat)){
            window.alert(
                'Invalid location!');
            document.getElementById("lonlat").focus();
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
                   window.alert('Update Succeded!\n');
                   this.props.history.push('/');
                }
                else {
                    window.alert('Update Failed!\n'
                    + 'This response came from the server: \n'
                    + body);
                }
            }
        );
    }
    
    loadOldPerson(){
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
                    
                    window.alert("An Error occurred!\n" +
                        "This is may be something with the server" +
                        "or you may have a typo in your id.\nThe following response came back:\n" +
                        body);
                    document.getElementById("id").focus();
                    
                }
            }
        );
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
            <UpdateForm 
                onChangeValue={this.handleChange}
                loadOldPerson={this.loadOldPerson}
                onUpdateClick={this.handleUpdateClick}
                onCancelClick={this.handleCancelClick}
                handleValidation={this.handleValidationState}
                returnLocation={this.returnLocation}
            />
        );
    }
}

export default UpdateFormContainer;