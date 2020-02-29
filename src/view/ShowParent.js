import React,{Component} from 'react';
import Firebase from '../Firebase';
import { Icon } from 'semantic-ui-react'

class ShowParent extends Component{

    constructor(props) {
        super(props);
        this.state={
            name: '',
            imageURL: '',
            tel: '',
            line_id: ''
        }
    }

    componentDidMount = () =>{
        Firebase.firestore().collection('parent')
        .doc(this.props.match.params.id).get()
        .then(doc => {
            this.setState({
                name: doc.data().name,
                imageURL : doc.data().imageURL,
                tel: doc.data().tel,
                line_id: doc.data().line_id

            });
        })
    }



    render(){
        return(
            <div>
                <br/>
                <div className="ui items">
                    <div class="item">
                    <div class="ui small image">
                        <a class="ui black ribbon label">
                            <i aria-hidden="true" class="user icon"></i>
                            {this.state.name}
                        </a>
                        <img src={this.state.imageURL} size />
                    </div>
                    <div class="content">
                        <div class="header">{this.state.name}</div>
                        <div class="meta"><a href={this.state.tel}><Icon link name='call' /> {this.state.tel}</a></div>
                        <div class="description"><Icon link name='linechat' /> : {this.state.line_id}</div>
                        <div class="extra">Extra</div>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}
export default ShowParent;