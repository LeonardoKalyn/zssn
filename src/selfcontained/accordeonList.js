import React from 'react';
import SurvivorContainer from './../container/survivorContainer';
import {PanelGroup} from 'react-bootstrap';
import getAllPeople from './../rest/getAllPeople';
import ReactList from 'react-list';

class SurvivorList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
              activeKey: '1',
        };
          
        this.handleSelect = this.handleSelect.bind(this);
        this.renderItem = this.renderItem.bind(this);
    }

    handleSelect(activeKey) {
        this.setState({ activeKey });
    }
  
    componentDidMount(){
        getAllPeople(
            (successful, body) => {
                this.setState({
                    survivorList: 
                        body.filter(
                            (survivor) => !survivor.infected
                        )
                });
                
                
            }    
        );
    }
    
    renderItem(index, key) {
        const survivor = this.state.survivorList[index];
        return (
            <SurvivorContainer
                survivor={survivor}
                key={key}    
            />
        );
    }

    render() {
        return (
            <div>
                {(!this.state.survivorList) && <div><h2>Loading...</h2></div>}
                {
                    (this.state.survivorList) && 
                    <PanelGroup>
                        <ReactList
                            itemRenderer={this.renderItem}
                            length={this.state.survivorList.length}
                            type='uniform'
                         />
                    </PanelGroup>
                }
            </div>
        );
    }
  
}

export default SurvivorList;