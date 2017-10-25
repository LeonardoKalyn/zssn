import React from 'react';
import { requestLostPoints } from './../rest/getReports';
import {Panel} from 'react-bootstrap';

class LostPointsPainel extends React.Component {
    
    constructor(props){
        super(props);
        
        this.state={lostPoints: 0};
    }
    
    componentWillMount(){
        requestLostPoints(
            (lostPoints) => {
                this.setState({
                    lostPoints,
                });
            }
        );
    }
    
    render() {
        return (
            <div className="text-center">
                <Panel header="Total of Points Lost" bsStyle="danger">
                    {this.state.lostPoints}
                </Panel>
            </div>
        );
    }
}

export default LostPointsPainel;