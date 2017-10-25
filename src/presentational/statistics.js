import React from "react";
import InfectionChart from './../container/infectionChartContainer';
import InventoryChart from './../container/inventoryChartContainer';

const Statistics = () => {
    return(
        <div>
            <InfectionChart/>
            <InventoryChart />
        </div>
    );
};


export default Statistics;