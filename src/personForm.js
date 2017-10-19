import React from 'react';
import { postNewPerson } from './rest/backend';

class PersonForm extends React.Component {
    constructor(props) {
    super(props);
        this.state = {
            person: {
                name: 'Kalyn',
                age: 21,
                gender: 'M',
                lonlat: '',
            },
            items: 'Water:1',
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
            case 'items':
                this.setState({
                    ...this.state,
                    [event.target.name]: event.target.value
                });
                break;
            default:
                console.log("Unknow target:" + event.target.name);
      }
    
    }
    
    handleSubmit() {
        postNewPerson(this.state, console.log);
    }
    render() {
        return (
            <div>
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
                <label>
                    Items:
                    <input type="text" name="items" value={this.state.items} onChange={this.handleChange} />
                </label>
                <br/>
                <button onClick={this.handleSubmit}>Save</button>
            </div>
        );
    }
}

export default PersonForm;