import React from 'react';
import reportInfected from './../rest/reportInfection';
import ReportForm from './../presentational/reportForm';
import ReportAlert from './reportAlertContainer';
import {withRouter} from 'react-router';

class ReportFormContainer extends React.Component {
    constructor(props) {
    super(props);
        this.state = {
            infected: props.location.state? props.location.state.id : '',
            id: '',
            popup: 'none',
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.dismissPopup = this.dismissPopup.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.formValidation = this.formValidation.bind(this);
    }

    handleChange(event) {
        this.setState({
            ...this.state,
            [event.target.id]: event.target.value
        });
    }
    
    dismissPopup() {
        this.setState({
            ...this.state,
            popup: 'none'
        });
    }
    
    formValidation() {
        if(!this.state.infected){
            this.setState({
                ...this.state,
                popup: 'invalid infected'
            });
            return false;
        }
        
        if(!this.state.id){
            this.setState({
                ...this.state,
                popup: 'invalid id'
            });
            return false;
        }
        return true;
    }
    
    handleSubmit() {
        if(this.formValidation()){
            reportInfected(
                this.state,
                (succesfull) => {
                    if(succesfull){
                        this.setState({
                            ...this.state,
                            popup: 'successful report'
                        });
                    }
                    else{
                        this.setState({
                            ...this.state,
                            popup: 'failed to report'
                        });
                    }
                }
            );
        }
    }
    render() {
        return (
            <div>
                <ReportAlert 
                    popup={this.state.popup}
                    onButtonClick={this.dismissPopup}
                />
                <ReportForm 
                    id={this.state.id}
                    infectedValue={this.state.infected}
                    onChangeValue={this.handleChange}
                    onReport={this.handleSubmit}
                />
            </div>
        );
    }
}

export default withRouter(ReportFormContainer);