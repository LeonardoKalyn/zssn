import React from 'react';
import { getSinglePerson } from './rest/backend';

class SinglePersonForm extends React.Component {
    constructor(props) {
    super(props);
        this.state = {
            id: '94710ac3-ac65-418b-8d61-a92c9d1096cb'
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            id: event.target.value
        });
    }
    
    handleSubmit() {
        getSinglePerson(this.state.id, console.log);
    }
    render() {
        return (
            <div>
                <label>
                    Person Id:
                    <input type="text" name="id" value={this.state.id} onChange={this.handleChange} />
                </label>
                <br/>
                <button onClick={this.handleSubmit}>Get Person</button>
            </div>
        );
    }
}

export default SinglePersonForm;