import React from 'react';
import {Panel, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

const SurvivorListItem = (props) => {
    const {survivor} = props;
    return (
        <Panel
            header={survivor.name}
            collapsible
        >
            {''.concat( survivor.gender, ', ', survivor.age)}
            <div className='text-center'>
                <Link 
                    to={{
                        pathname:'/trade',
                        state: { name: survivor.name }
                    }}
                    
                >
                    <Button 
                        bsStyle='primary'
                    >
                        Trade
                    </Button>
                </Link>
                {' '}
                <Link 
                    to={{
                        pathname:'/reportinfection',
                        state: { id: props.id }
                    }}
                    
                >
                    <Button 
                        bsStyle='danger'
                    >
                        Report
                    </Button>
                </Link>
            </div>
        </Panel>
    );
};

export default SurvivorListItem;