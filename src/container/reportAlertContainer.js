import React from 'react';
import PopupAlert from './../presentational/popupAlert';
import {withRouter} from 'react-router';

class ReportAlert extends React.Component {
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
                
            case 'successful report':
                this.setState({
                    show: true,
                    title: "Successfully Reported!",
                    text: "Thanks for your report. Actions like this help to ensure our survival..",
                    style: "success",
                    action: () => this.props.history.push('/')
                });
                break;
            
            case 'failed to report':
                this.setState({
                    show: true,
                    title: "Could not Report!",
                    text: "This may be something wrong with the server, or you may have a typo in one of the Ids." +
                            "This can also happen if you already reported this person before.",
                    style: "danger",
                    action: () => document.getElementById("id").focus()
                });
                break;
                
            case 'invalid infected':
                this.setState({
                    show: true,
                    title: "Id is missing",
                    text: "You need to provide the Id of the infected!",
                    style: "warning",
                    action: () => document.getElementById("infected").focus()
                });
                break;
                
            case 'invalid id':
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
        this.state.action();
        this.props.onButtonClick();
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

export default withRouter(ReportAlert);