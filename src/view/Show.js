import React,{Component} from 'react';
import Firebase from '../Firebase';
import { Button, Card, Image } from 'semantic-ui-react'

class Show extends Component{
    constructor(props) {
        super(props);
        this.state={
            name: '',
            imageURL: '',
            stdId: ''
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
                        Steve wants to add you to the group <strong>best friends</strong>
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <div className='ui two buttons'>
                        <Button basic color='yellow'>
                            Edit Profile
                        </Button>
                        <Button basic color='violet'>
                            Add Parent
                        </Button>
                        </div>
                    </Card.Content>
                </Card>
            </div>
        )
    }
}
export default Show;