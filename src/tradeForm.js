import React from 'react';
import { trade } from './rest/backend';

class TradeForm extends React.Component {
    constructor(props) {
    super(props);
        this.state = {
            id: '94710ac3-ac65-418b-8d61-a92c9d1096cb',
            consumer: {
                name: 'Kalyn',
                pick: 'Water:1',
                payment: 'Water:1',
            },
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        switch(event.target.name){
            case 'id':
                this.setState({
                    ...this.state,
                    [event.target.name]: event.target.value
                });
                break;
            case 'name':
            case 'pick':
            case 'payment':
                this.setState({
                    ...this.state,
                    consumer:{
                        ...this.state.consumer,
                        [event.target.name]: event.target.value
                    }
                });
                break;
            default:
                console.log("Unknown target: " + event.target.name);
        }
    }
    
    handleSubmit() {
        trade(this.state, console.log);
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
                    <input type="text" name="name" value={this.state.consumer.name} onChange={this.handleChange} />
                </label>
                <br/>
                <label>
                    Pick:
                    <input type="text" name="pick" value={this.state.consumer.pick} onChange={this.handleChange} />
                </label>
                <br/>
                <label>
                    Payment:
                    <input type="text" name="payment" value={this.state.consumer.payment} onChange={this.handleChange} />
                </label>
                <br/>
                <button onClick={this.handleSubmit}>Trade</button>
            </div>
        );
    }
}

export default TradeForm;