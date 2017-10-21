import React from 'react';
import { reportInfected } from './rest/access';

class ReportForm extends React.Component {
    constructor(props) {
    super(props);
        this.state = {
            infected: '',
            id: ''
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        });
    }
    
    handleSubmit() {
        reportInfected(this.state, console.log);
    }
    render() {
        return (
            <div>
                <label>
                    Infected:
                    <input type="text" name="infected" value={this.state.infected} onChange={this.handleChange} />
                </label>
                <br/>
                <label>
                    My Id:
                    <input type="text" name="id" value={this.state.id} onChange={this.handleChange} />
                </label>
                <br/>
                <button onClick={this.handleSubmit}>Save</button>
            </div>
        );
    }
}

export default ReportForm;