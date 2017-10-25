import React from 'react';
import reportInfected from './../rest/reportInfection';
import ReportForm from './../presentational/reportForm';

class ReportFormContainer extends React.Component {
    constructor(props) {
    super(props);
        this.state = {
            infected: '',
            id: ''
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.formValidation = this.formValidation.bind(this);
    }

    handleChange(event) {
        this.setState({
            ...this.state,
            [event.target.id]: event.target.value
        });
    }
    
    formValidation() {
        if(!this.state.infected){
            window.alert("Invalid infected id.");
            document.getElementById("infected").focus();
            return false;
        }
        
        if(!this.state.id){
            window.alert("Your Id is incvalid.");
            document.getElementById("id").focus();
            return false;
        }
        return true;
    }
    
    handleSubmit() {
        if(this.formValidation()){
            reportInfected(
                this.state,
                (succesfull, statusCode) => {
                    if(succesfull){
                        window.alert(
                            "Thank you for your report!\n" +
                            "Your report will help our survival.");
                        this.props.history.push('/');
                    }
                    else{
                        window.alert(
                            "Unable to report!\n" +
                            "This may be something with the server, or you may "+
                            "have mistyped one of the Ids.\n" +
                            "This response came from the server:\n" +
                            statusCode);
                        document.getElementById("infected").focus();
                    }
                }
            );
        }
    }
    render() {
        return (
            <ReportForm 
                onChangeValue={this.handleChange}
                onReport={this.handleSubmit}
            />
        );
    }
}

export default ReportFormContainer;