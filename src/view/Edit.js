import React,{Component} from 'react';
import Firebase from '../Firebase';
import { Button, Card, Image, Form, Input } from 'semantic-ui-react';

class Edit extends Component{

    constructor(props) {
        super(props);
        this.state = {
            name: 'Jump',
            imageURL: '',
            stdId: '',
            email: '',
            address: ''
        }
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
                address : doc.data().address,
            })
        })
        .catch(err => {
            console.log('Error getting document', err);
        });
    }

    handleNameChange = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    handleEmailChange = (e) =>{
      this.setState({
        email: e.target.value
      })
    }

    handleAddressChange = (e) =>{
      this.setState({
        address: e.target.value
      })
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        Firebase.firestore().collection('student').doc(this.props.match.params.id)
        .update(this.state).then(doc =>{
            this.props.history.push('/show/'+this.props.match.params.id)
        })
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                <Card fluid>
                    <Card.Content>
                        <Image
                        floated='right'
                        size='mini'
                        src={this.state.imageURL}
                        />
                        <Card.Header>Edit Student Info</Card.Header>
                        <Card.Meta>Student ID :{this.state.stdId}</Card.Meta>
                        <Card.Description>
                        <Form.Field
                                id='form-input-control-first-name'
                                control={Input}
                                label='Name : '
                                placeholder='First name'
                                value={this.state.name}
                                onChange={this.handleNameChange} />
                        <Form.Field
                                id='form-input-control-first-name'
                                control={Input}
                                label='Email : '
                                placeholder='Email'
                                value={this.state.email}
                                onChange={this.handleEmailChange} />
                        <Form.TextArea  label='Address :' 
                                        placeholder='Tell us more about you...' 
                                        value={this.state.address}
                                        onChange={this.handleAddressChange} />
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <Button type="submit" basic color='green'>
                            Update
                        </Button>
                    </Card.Content>
                    </Card>
                </Form>
            </div>
        )
    }
};
export default Edit;