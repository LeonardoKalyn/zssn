import React from 'react';
import PopupAlert from './../presentational/popupAlert';
import {withRouter} from 'react-router';

class PersonAlert extends React.Component {
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
            case 'invalid name':
                this.setState({
                    show: true,
                    title: "Name is required",
                    text: "You must provide a name.",
                    style: "warning",
                    action: () => document.getElementById("name").focus()
                });
                break;
                
            case 'invalid age':
                this.setState({
                    show: true,
                    title: "Age is required",
                    text: "You must provide a valid age.",
                    style: "warning",
                    action: () => document.getElementById("age").focus()
                });
                break;
            
            case 'invalid gender':
                this.setState({
                    show: true,
                    title: "Gender is required!",
                    text: "You need to provida a gender option.\n " + 
                            "If you don't identity with any gender just fill in your biological sex.",
                    style: "warning",
                    action: () => document.getElementById("gender").focus()
                });
                break;
            
            case 'invalid location':
                this.setState({
                    show: true,
                    title: "Invalid location",
                    text: "The provided location is not valid.",
                    style: "warning",
                    action: () => document.getElementById("lonlat").focus()
                });
                break;
                
            case 'invalid Water':
                this.setState({
                    show: true,
                    title: "Invalid Water Resource",
                    text: "You must provide a valid number for water.",
                    style: "warning",
                    action: () => document.getElementById('Water').focus()
                });
                break;
                
            case 'invalid Food':
                this.setState({
                    show: true,
                    title: "Invalid Food Resource",
                    text: "You must provide a valid number for food.",
                    style: "warning",
                    action: () => document.getElementById('Food').focus()
                });
                break;
            
            case 'invalid Medication':
                this.setState({
                    show: true,
                    title: "Invalid Medication Resource",
                    text: "You must provide a valid number for medication.",
                    style: "warning",
                    action: () => document.getElementById('Medication').focus()
                });
                break;
            
            case 'invalid Ammunition':
                this.setState({
                    show: true,
                    title: "Invalid Water Resource",
                    text: "You must provide a valid number for ammunition.",
                    style: "warning",
                    action: () => document.getElementById('Ammunition').focus()
                });
                break;
                
            case 'successful sign up':
                this.setState({
                    show: true,
                    title: "Successfully updated!",
                    text: "Thanks for your registration.\n " + 
                            "This is your id:\n " + nextProps.adicionalData + 
                            "\nIt's important so save your id.",
                    style: "success",
                    action: () => this.props.history.push('/')
                });
                break;
            
            case 'failed to sign up':
                this.setState({
                    show: true,
                    title: "Could not Sign up!",
                    text: "This may be something wrong with the server.\n " +
                            "Or the name you picked was already picked.\n " +
                            "This response came back from the server:\n " +
                            JSON.stringify(nextProps.adicionalData),
                    style: "danger",
                    action: () => document.getElementById("name").focus()
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

export default withRouter(PersonAlert);