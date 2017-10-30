import React from "react";
import InfectionChart from './../container/infectionChartContainer';
import InventoryChart from './../container/inventoryChartContainer';
import LostPointsPainel from './../selfcontained/lostPointsPanel';
import {Well} from 'react-bootstrap';

const Statistics = () => {
    return(
        <div>
            <h1>Statistics</h1>
            <Well>
                <InfectionChart/>
            </Well>
            <Well>
                <InventoryChart />
            </Well>
            <Well>
                <LostPointsPainel />
            </Well>
        </div>
    );
};


export default Statistics;