import React from 'react';
import PopupAlert from './../presentational/popupAlert';
import {withRouter} from 'react-router';

class UpdateAlert extends React.Component {
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
                    text: "To update your data you must make "+
                            "it different from the previous values." +
                            "If you don't want to update just click cancel, " +
                            "or move to another page.",
                    style: "warning",
                    action: () => document.getElementById("id").focus()
                });
                break;
                
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
                    action: () => null
                });
                break;
                
            case 'successful update':
                this.setState({
                    show: true,
                    title: "Successfully updated!",
                    text: "The new data was successfully updated on the server.",
                    style: "success",
                    action: () => this.props.history.push('/')
                });
                break;
            
            case 'failed to update':
                this.setState({
                    show: true,
                    title: "Could not update!",
                    text: "This may be something wrong with the server",
                    style: "danger",
                    action: () => document.getElementById("id").focus()
                });
                break;
                
            case 'failed to fetch data':
                this.setState({
                    show: true,
                    title: "Could not find the old data!!",
                    text: "This is may be something with the server, " +
                            "or you may have a typo in your id.",
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

export default withRouter(UpdateAlert);