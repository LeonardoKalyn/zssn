import React from 'react';
import PopupAlert from './../presentational/popupAlert';

class StandardAlert extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          showModal: this.props.showModal
        };
        
        this.dismiss = this.dismiss.bind(this);
    }
  
    dismiss() {
        this.setState({ showModal: false });
        this.props.action();
    }

    render() {
        if (this.state.showModal) {
            const {data} = this.props;
            return (
                <PopupAlert
                    title={data.title}
                    showModal={data.show}
                    bsStyle={data.style}
                    onButtonClick={this.dismiss}
                >
                    {data.text}
                </PopupAlert>
            );
        }
        else{
            return null;
        }
    }
}

export default StandardAlert;