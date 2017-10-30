import React from 'react';
import { trade } from './../rest/properties';
import TradeForm from './../presentational/tradeForm';
import TradeAlert from './tradeAlertContainer';
import * as validationLogic from './personValidationLogic';
import {withRouter} from 'react-router';

class TradeFormContainer extends React.Component {
    constructor(props) {
    super(props);
        this.state = {
            id: '',
            consumer: {
                name: props.location.state? props.location.state.name : '',
                pick: {
                    Water: 0,
                    Food: 0,
                    Medication: 0,
                    Ammunition: 0
                },
                payment: {
                    Water: 0,
                    Food: 0,
                    Medication: 0,
                    Ammunition: 0
                },
            },
            
            popup: 'none',
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.dismissPopup = this.dismissPopup.bind(this);
    }
    
    dismissPopup() {
        this.setState({
            ...this.state,
            popup: 'none'
        });
    }

    handleChange(event) {
        const value = event.target.value;
        
        const updateResource = (target, resourceName) =>{
            this.setState({
                ...this.state,
                consumer:{
                    ...this.state.consumer,
                    [target]: {
                        ...this.state.consumer[target],
                        [resourceName]: value
                    }
                }
            });
        };
        switch(event.target.id){
            case 'id':
                this.setState({
                    ...this.state,
                    id: value
                });
                break;
            case 'name':
                this.setState({
                    ...this.state,
                    consumer:{
                        ...this.state.consumer,
                        name: value
                    }
                });
                break;
            case 'bWater':
                updateResource('pick', 'Water');
                break;
            case 'bFood':
                updateResource('pick', 'Food');
                break;
            case 'bMedication':
                updateResource('pick', 'Medication');
                break;
            case 'bAmmunition':
                updateResource('pick', 'Ammunition');
                break;
            case 'pWater':
                updateResource('payment', 'Water');
                break;
            case 'pFood':
                updateResource('payment', 'Food');
                break;
            case 'pMedication':
                updateResource('payment', 'Medication');
                break;
            case 'pAmmunition':
                updateResource('payment', 'Ammunition');
                break;
                
            default:
                console.log("Unknown target: " + event.target.name);
        }
    }
    
    calculatePoints(resources){
        return (
            (resources.Water      * 4) +
            (resources.Food       * 3) +
            (resources.Medication * 2) + 
            (resources.Ammunition * 1));
    }
    
    tradeValidationLogic(){
        const {pick, payment} = this.state.consumer;
        return(
            (JSON.stringify(pick) !== JSON.stringify(payment) ) &&
            (this.calculatePoints(pick) === this.calculatePoints(payment))
        );
    }
    
    handleValidationState = {
        nameValidation: () =>
            validationLogic.validateName(this.state.consumer.name) ?
                'success' : 'error',
        
        resourceValidation: (resouceId) =>{
            let resource;
            if(resouceId.startsWith("b"))
                resource = this.state.consumer.pick[resouceId.substring(1)];
            else
                resource = this.state.consumer.payment[resouceId.substring(1)];
            
            if(resource===0 || resource === '')
                return null;
            else
                return validationLogic.validateNumber(resource) ? 
                    'success' : 'error';
        },
        
        pointsValidation: () => {
            const {pick, payment} = this.state.consumer;
            if(
                (this.calculatePoints(pick) === 0) &&
                (this.calculatePoints(payment) === 0)
            )
                return null;
            else
                return this.tradeValidationLogic() ? 
                    'success' :  'error';
        }
    }
    
    validateForm(){
        if(!this.state.id){
            this.setState({
                ...this.state,
                popup: "empty id"
            });
            return false;
        }
        
        if(!validationLogic.validateName(this.state.consumer.name)){
            this.setState({
                ...this.state,
                popup: "invalid name"
            });
            return false;
        }
        
        if(!validationLogic.validateNumber(this.state.consumer.pick.Water)){
            this.setState({
                ...this.state,
                popup: "invalid bWater"
            });
            return false;
        }
        
        if(!validationLogic.validateNumber(this.state.consumer.pick.Food)){
            this.setState({
                ...this.state,
                popup: "invalid bFood"
            });
            return false;
        }
        
        if(!validationLogic.validateNumber(this.state.consumer.pick.Medication)){
            this.setState({
                ...this.state,
                popup: "invalid bMedication"
            });
            return false;
        }
            
        if(!validationLogic.validateNumber(this.state.consumer.pick.Ammunition)){
            this.setState({
                ...this.state,
                popup: "invalid pAmmunition"
            });
            return false;
        }
        
        if(!validationLogic.validateNumber(this.state.consumer.payment.Water)){
            this.setState({
                ...this.state,
                popup: "invalid pWater"
            });
            return false;
        }
        
        if(!validationLogic.validateNumber(this.state.consumer.payment.Food)){
            this.setState({
                ...this.state,
                popup: "invalid pFood"
            });
            return false;
        }
        
        if(!validationLogic.validateNumber(this.state.consumer.payment.Medication)){
            this.setState({
                ...this.state,
                popup: "invalid pMedication"
            });
            return false;
        }
            
        if(!validationLogic.validateNumber(this.state.consumer.payment.Ammunition)){
            this.setState({
                ...this.state,
                popup: "invalid pAmmunition"
            });
            return false;
        }
        
        if(!this.tradeValidationLogic()){
            this.setState({
                ...this.state,
                popup: "equal data"
            });
            return false;
        }
        return true;
    }
    
    handleSubmit() {
        console.log(this.state);
        const mapItems = (items) =>{
            let response = "";
            Object.keys(items).forEach(
                (key) => {
                    if(items[key] > 0){
                        response.concat(
                            key,
                            ":",
                            items[key],
                            ";"
                        );
                    }
                }
            );
            if(response.endsWith(";"))
                response =  response.substring(0,response.length() -1);
            
            return(response);
        };
        
        if(this.validateForm()){
            const tradeData={
                id: this.state.id,
                consumer:{
                    name: this.state.consumer.name,
                    pick: mapItems(this.state.consumer.pick),
                    payment: mapItems(this.state.consumer.payment)
                }
            };
            console.log(tradeData);
            trade(
                tradeData,
                (successful, response) => {
                    if(successful){
                       this.setState({
                            ...this.state,
                            popup: "successful trade"
                        });
                    }
                    else {
                        this.setState({
                            ...this.state,
                            popup: "failed to trade"
                        });
                    }
                }
            );
        }
    }
    
    render() {
        return (
            <div>
                <TradeAlert 
                    popup={this.state.popup}
                    dismissPopup={this.dismissPopup}
                />
                <TradeForm 
                    id={this.state.id}
                    name={this.state.consumer.name}
                    onTrade={this.handleSubmit}
                    onChangeValue={this.handleChange}
                    handleValidation={this.handleValidationState}
                    buying={this.calculatePoints(this.state.consumer.pick)}
                    paying={this.calculatePoints(this.state.consumer.payment)}
                />
            </div>
        );
    }
}

export default withRouter(TradeFormContainer);