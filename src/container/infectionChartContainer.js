import React from "react";
import {requestInfected, requestNonInfected } from './../rest/getReports';
import InfectionChart from './../presentational/infectionChart';

class InfectionChartContainer extends React.Component {
    
    constructor(props){
        super(props);
        this.state={
            loading:{
                infected:true,
                healthy:true,
            },
            infected: null,
            healthy: null,
        };
    }
    
    componentDidMount() {
        requestInfected(
            (infected) => {
                this.setState({
                    ...this.state,
                    loading:{
                        ...this.state.loading,
                        infected: false,
                    },
                    infected,
                });
            }
        );
        
        requestNonInfected(
            (healthy) => {
                this.setState({
                    ...this.state,
                    loading:{
                        ...this.state.loading,
                        healthy: false,
                    },
                    healthy,
                });
            }
        );
        
    }
    
    render () {
        if(this.state.loading.healthy || this.state.loading.infected){
            return(
                <h3>Loading Infection Chart...</h3>
            );
        }
        return (
            <InfectionChart 
                infected={this.state.infected.toFixed(2)}
                healthy={this.state.healthy.toFixed(2)}
            />
        );
    }
}

export default InfectionChartContainer;