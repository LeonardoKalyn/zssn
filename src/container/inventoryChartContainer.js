import React from "react";
import { requestInventory } from './../rest/getReports';
import InventoryChart from './../presentational/inventoryChart';

class InventoryChartContainer extends React.Component {
    
    constructor(props){
        super(props);
        this.state={
            loading:true,
            inventory: null
        };
    }
    
    componentDidMount() {
        requestInventory(
            (inventory) => {
                this.setState({
                    loading: false,
                    inventory,
                });
            }
        );
    }
    
    render () {
        if(this.state.loading){
            return(
                <h3>Loading average of items chart...</h3>
            );
        }
        return (
            <InventoryChart 
                inventory={this.state.inventory}
            />
        );
    }
}

export default InventoryChartContainer;