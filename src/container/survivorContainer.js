import React from 'react';
import Survivor from './../presentational/survivor';
import {withRouter} from 'react-router';

class SurvivorContainer extends React.Component {
    constructor(props){
        super(props);
        
        this.state={
            id: props.survivor.location
                .replace("http://zssn-backend-example.herokuapp.com/api/people/", '')
        };
    }
    
    render(){
        return(
            <Survivor 
                {...this.props} 
                id={this.state.id}
            />
        );
    }
}

export default withRouter(SurvivorContainer);