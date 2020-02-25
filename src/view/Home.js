import React,{Component} from 'react';
import { Image } from 'semantic-ui-react';

class Home extends Component {
    render() { 
        return(
            <div>
                <div className="ui one column stackable center aligned page grid">
                    <div className="column twelve wide">
                        <h1>Welcome to Our School.....</h1>
                    </div>
                </div>
                <Image src='../../images/logo.jpg' fluid />
            </div>
        )
    }
}

export default Home;