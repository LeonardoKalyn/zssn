import React from 'react';
import { Panel, Button } from 'react-bootstrap';

class CollapsiblePanelContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open:false
        };
    }
    
    
    render() {
        return (
            <div>
                <Button 
                    bsStyle={this.props.btStyle}
                    onClick={() => this.setState({open: !this.state.open})}
                >
                    {this.props.btTitle}
                </Button>
                <Panel collapsible expanded={this.state.open}>
                    {this.props.children}
                </Panel>
            </div>
        );
    }
};

export default CollapsiblePanelContainer;