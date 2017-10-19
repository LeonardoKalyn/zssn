import React from 'react';
import { updatePerson } from './rest/backend';

class UpdateForm extends React.Component {
    constructor(props) {
    super(props);
        this.state = {
            id: '94710ac3-ac65-418b-8d61-a92c9d1096cb',
            person: {
                name: 'Kalyn',
                age: 21,
                gender: 'M',
                lonlat: '',
            },
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        switch (event.target.name) {
            case 'name':
            case 'age':
            case 'gender':
            case 'lonlat':
                this.setState({
                    ...this.state,
                    person: {
                        ...this.state.person,
                        [event.target.name]: event.target.value
                    }
                });
                break;
            case 'id':
                this.setState({
                    ...this.state,
                    [event.target.name]: event.target.value
                });
                break;
            default:
                console.log('Unknow target: ' + event.target.name);
      }
    }
    
    handleSubmit() {
        updatePerson(this.state, console.log);
    }
    render() {
        return (
            <div>
                <label>
                    My Id:
                    <input type="text" name="id" value={this.state.id} onChange={this.handleChange} />
                </label>
                <br/>
                <label>
                    Name:
                    <input type="text" name="name" value={this.state.person.name} onChange={this.handleChange} />
                </label>
                <br/>
                <label>
                    Age:
                    <input type="number" name="age" value={this.state.person.age} onChange={this.handleChange} />
                </label>
                <br/>
                <label>
                    Gender:
                    <input type="text" name="gender" value={this.state.person.gender} onChange={this.handleChange} />
                </label>
                <br/>
                <label>
                    Location:
                    <input type="text" name="lonlat" value={this.state.person.lonlat} onChange={this.handleChange} />
                </label>
                <br/>
                <button onClick={this.handleSubmit}>Update</button>
            </div>
        );
    }
}

export default UpdateForm;