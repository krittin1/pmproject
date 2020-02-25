import React,{Component} from 'react';

// Initial State
const INIT_STATE = {
    imageURL: null,
    fullDesc: null
  };

class Detect extends Component{
    constructor(props) {
        super(props);
        this.state = { ...INIT_STATE };
      }

    render (){
      return(
        <div>
          <h1>Detect</h1>
        </div>
      )
    }
}

export default Detect;