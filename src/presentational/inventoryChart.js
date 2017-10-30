import React from "react";
import Chart from 'chart.js';

class InfectionChart extends React.Component {
    componentDidMount() {
        const {inventory} = this.props;
        
        var ctx = document.getElementById("inventoryChart");
        new Chart(ctx, {
            type: 'polarArea',
            data: {
                labels: ['General', 'Per surviver'],
                datasets: [{
                    data: [inventory.perPerson.toFixed(2),
                        inventory.perHelthyPerson.toFixed(2)],
                    backgroundColor: [
                        'hsla(36, 100%, 50%, 0.65)',
                        'hsla(216, 100%, 50%, 0.65)'
                    ],
                    borderColor: [
                        'hsl(36, 100%, 35%)',
                        'hsl(216, 100%, 25%)'
                    ],
                    borderWidth: 1
                }]
            },
            
            options:{
                title:{
                    display: true,
                    text: "Average of Items"
                }
            }
        });
    }
    
    render () {
        return (
            <canvas id="inventoryChart" ></canvas>
        );
    }
}

export default InfectionChart;