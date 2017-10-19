import React from 'react';
import { getPersonProperties } from './rest/backend';

class PropertiesForm extends React.Component {
    constructor(props) {
    super(props);
        this.state = {
            id: '94710ac3-ac65-418b-8d61-a92c9d1096cb',
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            'id': event.target.value
        });
    }
    
    handleSubmit() {
        getPersonProperties(this.state.id, console.log);
    }
    render() {
        return (
            <div>
                <label>
                    My Id:
                    <input type="text" name="id" value={this.state.id} onChange={this.handleChange} />
                </label>
                <br/>
                <button onClick={this.handleSubmit}>Trade</button>
            </div>
        );
    }
}

export default PropertiesForm;