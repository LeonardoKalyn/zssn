import React from "react";
import Chart from 'chart.js';

class InfectionChart extends React.Component {
    
    componentDidMount() {
        var ctx = document.getElementById("infectionChart");
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Infected', 'Healthy'],
                datasets: [{
                    label: '% of people',
                    data: [this.props.infected, this.props.healthy],
                    backgroundColor: [
                        'hsla(0, 100%, 50%, 0.8)',
                        'hsla(140, 100%, 30%, 0.65)'
                    ],
                    borderColor: [
                        'hsl(0 100%, 30%',
                        'hsl(120, 100%, 30%)'
                    ],
                    borderWidth: 1
                }]
            },
            
            options:{
                title:{
                    display: true,
                    text: "Infection Spread %"
                }
            }
        });
    }
    
    render () {
        return(
            <canvas id="infectionChart" width="400" height="400"></canvas>
        );
    }
}

export default InfectionChart;