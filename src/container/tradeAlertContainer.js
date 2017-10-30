import React from 'react';
import PopupAlert from './../presentational/popupAlert';
import {withRouter} from 'react-router';

class TradeAlert extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            show: false,
            title: '',
            text: '',
            style: null,
        };
        
        this.onButtonClick = this.onButtonClick.bind(this);
    }
    
    componentWillReceiveProps(nextProps){
        switch(nextProps.popup){
            case 'equal data':
                this.setState({
                    show: true,
                    title: "The new data is not different from the old one.",
                    text: "The number of points on each side of the "+
                            "trade must be equal, but you can't trade the same amount of the " +
                            "the same items.",
                    style: "warning",
                    action: () => document.getElementById("id").focus()
                });
                break;
                
            case 'empty id':
                this.setState({
                    show: true,
                    title: "Id is missing",
                    text: "You need to provide your id!",
                    style: "warning",
                    action: () => document.getElementById("id").focus()
                });
                break;
            
                
            case 'invalid name':
                this.setState({
                    show: true,
                    title: "Name is required",
                    text: "You must provide the name of the person you are trading with.",
                    style: "warning",
                    action: () => document.getElementById("name").focus()
                });
                break;
                
            case 'invalid bWater':
                this.setState({
                    show: true,
                    title: "Invalid Water Resource",
                    text: "You must provide a valid number for the water you are buying.",
                    style: "warning",
                    action: () => document.getElementById('bWater').focus()
                });
                break;
                
            case 'invalid bFood':
                this.setState({
                    show: true,
                    title: "Invalid Food Resource",
                    text: "You must provide a valid number for the food you are buying.",
                    style: "warning",
                    action: () => document.getElementById('bFood').focus()
                });
                break;
            
            case 'invalid bMedication':
                this.setState({
                    show: true,
                    title: "Invalid Medication Resource",
                    text: "You must provide a valid number for the medication you are buying.",
                    style: "warning",
                    action: () => document.getElementById('bMedication').focus()
                });
                break;
            
            case 'invalid bAmmunition':
                this.setState({
                    show: true,
                    title: "Invalid Water Resource",
                    text: "You must provide a valid number for the ammunition you are buying.",
                    style: "warning",
                    action: () => document.getElementById('bAmmunition').focus()
                });
                break;
                
            case 'invalid pWater':
                this.setState({
                    show: true,
                    title: "Invalid Water Resource",
                    text: "You must provide a valid number for the water you are paying.",
                    style: "warning",
                    action: () => document.getElementById('pWater').focus()
                });
                break;
                
            case 'invalid pFood':
                this.setState({
                    show: true,
                    title: "Invalid Food Resource",
                    text: "You must provide a valid number for the food you are paying.",
                    style: "warning",
                    action: () => document.getElementById('pFood').focus()
                });
                break;
            
            case 'invalid pMedication':
                this.setState({
                    show: true,
                    title: "Invalid Medication Resource",
                    text: "You must provide a valid number for the medication you are paying.",
                    style: "warning",
                    action: () => document.getElementById('pMedication').focus()
                });
                break;
            
            case 'invalid pAmmunition':
                this.setState({
                    show: true,
                    title: "Invalid Water Resource",
                    text: "You must provide a valid number for the ammunition you are paying.",
                    style: "warning",
                    action: () => document.getElementById('pAmmunition').focus()
                });
                break;
                
            case 'successful trade':
                this.setState({
                    show: true,
                    title: "Successfully Traded!",
                    text: "Your resources were updated..",
                    style: "success",
                    action: () => this.props.history.push('/')
                });
                break;
            
            case 'failed to trade':
                this.setState({
                    show: true,
                    title: "Could not trade!",
                    text: "This may be something wrong with the server",
                    style: "danger",
                    action: () => document.getElementById("id").focus()
                });
                break;
                
            default:
                this.setState({
                show: false,
                title: '',
                text: '',
                style: null,
                action: () => null
            });
        }
    }
    
    onButtonClick(){
        this.props.dismissPopup();
        this.state.action();
    }
    
    render() {
        return(
            <PopupAlert
                title={this.state.title}
                showModal={this.state.show}
                bsStyle={this.state.style}
                onButtonClick={this.onButtonClick}
            >
                {this.state.text}
            </PopupAlert>
        );
    }
}

export default withRouter(TradeAlert);