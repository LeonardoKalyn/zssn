import React from 'react';
import { trade } from './../rest/properties';
import TradeForm from './../presentational/tradeForm';
import * as validationLogic from './personValidationLogic';

class TradeFormContainer extends React.Component {
    constructor(props) {
    super(props);
        this.state = {
            id: '94710ac3-ac65-418b-8d61-a92c9d1096cb',
            consumer: {
                name: '',
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
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const value = event.target.value ? 
            event.target.value : 0;
        
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
                    [event.target.name]: value
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
            window.alert("Your id is required.");
            document.getElementById("id").focus();
            return false;
        }
        
        if(!validationLogic.validateName(this.state.consumer.name)){
            window.alert("The given name is invalid.");
            document.getElementById("name").focus();
            return false;
        }
        
        if(!validationLogic.validateNumber(this.state.consumer.pick.Water)){
            window.alert('Your Water resource is invalid');
            document.getElementById('bWater').focus();
            return false;
        }
        
        if(!validationLogic.validateNumber(this.state.consumer.pick.Food)){
            window.alert('Your Food resourcer is invalid!');
            document.getElementById('bFood').focus();
            return false;
        }
        
        if(!validationLogic.validateNumber(this.state.consumer.pick.Medication)){
            window.alert('Medication is invalid!');
            document.getElementById("bMedication").focus();
            return false;
        }
            
        if(!validationLogic.validateNumber(this.state.consumer.pick.Ammunition)){
            window.alert('Your Ammunition resource is invalid');
            document.getElementById('bAmmunition').focus();
            return false;
        }
        
        if(!validationLogic.validateNumber(this.state.consumer.payment.Water)){
            window.alert('Your Water resource is invalid');
            document.getElementById('pWater').focus();
            return false;
        }
        
        if(!validationLogic.validateNumber(this.state.consumer.payment.Food)){
            window.alert('Your Food resourcer is invalid!');
            document.getElementById('pFood').focus();
            return false;
        }
        
        if(!validationLogic.validateNumber(this.state.consumer.payment.Medication)){
            window.alert('Medication is invalid!');
            document.getElementById("pMedication").focus();
            return false;
        }
            
        if(!validationLogic.validateNumber(this.state.consumer.payment.Ammunition)){
            window.alert('Your Ammunition resource is invalid');
            document.getElementById('pAmmunition').focus();
            return false;
        }
        
        if(!this.tradeValidationLogic()){
            window.alert("The number of points on each side of the "+
                "trade must be equal, but you can't trade the same amount of the " +
                "the same items.");
            return false;
        }
        return true;
    }
    
    handleSubmit() {
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
                       window.alert('Trade Succeded!');
                       this.props.history.push('/');
                    }
                    else {
                        window.alert('Trade Failed!\n'
                        + 'This response came from the server: \n'
                        + response);
                    }
                }
            );
        }
            
    }
    
    render() {
        return (
            <TradeForm 
                onTrade={this.handleSubmit}
                onChangeValue={this.handleChange}
                handleValidation={this.handleValidationState}
                buying={this.calculatePoints(this.state.consumer.pick)}
                paying={this.calculatePoints(this.state.consumer.payment)}
            />
        );
    }
}

export default TradeFormContainer;