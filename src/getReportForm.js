import React from "react";
import {getReport} from './rest/backend';

class GetReportForm extends React.Component {
    constructor(props) {
    super(props);
        this.state = {
            selected: ''
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({selected: event.target.value});
    }
    
    handleSubmit() {
        getReport(this.state.selected, console.log);
    }
    render() {
        return (
            <div>
                <select value={this.state.value} onChange={this.handleChange}>
                    <option value="">Available options</option>
                    <option value="infected">Infected</option>
                    <option value="non infected">Non Infected</option>
                    <option value="inventory">People Inventory</option>
                    <option value="lost points">Infected Inventory</option>
                </select>
                <br/>
                <button onClick={this.handleSubmit}>Get Report</button>
            </div>
        );
    }
}

export default GetReportForm;