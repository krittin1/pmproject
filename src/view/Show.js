import React,{ Component } from 'react';
import Firebase from '../Firebase';
import { Card, Image } from 'semantic-ui-react';

class Show extends Component{
    constructor(props) {
        super(props);
        this.state={
            name: '',
            imageURL: '',
            stdId: '',
            email: '',
            address: ''
        };
    }

    componentDidMount = () =>{
        Firebase.firestore().collection('student')
        .doc(this.props.match.params.id).get()
        .then(doc =>{
            this.setState({
                name : doc.data().name,
                imageURL : doc.data().imageURL,
                stdId : doc.data().stdId,
                email: doc.data().email,
                address : doc.data().address
            })
        })
        .catch(err => {
            console.log('Error getting document', err);
        });
    }
    render(){
        return(
            <div>
                <Card fluid>
                    <Card.Content>
                        <Image fluid
                        src={this.state.imageURL}
                        />
                        <Card.Header>{this.state.name}</Card.Header>
                        <Card.Meta>{this.state.stdId}</Card.Meta>
                        <Card.Description>
                        Email: {this.state.email}
                        <br/>
                        {this.state.address}
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <div className='ui two buttons'>
                        <a  href={'/edit/'+ this.props.match.params.id} class="ui yellow basic button">Edit Profile</a>
                        <a  href={'/addparent/'+ this.props.match.params.id} class="ui violet basic button">AddParent</a>
                        </div>
                    </Card.Content>
                </Card>
            </div>
        )
    }
}
export default Show;