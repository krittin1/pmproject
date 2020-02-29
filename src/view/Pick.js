import React,{Component} from 'react';
import Firebase from '../Firebase';
import { Grid, Image } from 'semantic-ui-react';

class Pick extends Component{

    constructor(props) {
        super(props);
        this.state = {
            parent_url: '',
            parent_name: '',
            line_id: '',
            tel: '',
            std_data: [],
            std_id: [],
        }
    }

    componentDidMount = () =>{
        Firebase.firestore().collection('parent')
        .where('name', '==', this.props.match.params.id).get()
        .then(data => {
            data.forEach(child =>{
                var id = child.data().studentID;
                this.setState({
                    parent_name: child.data().name,
                    parent_url: child.data().imageURL,
                    line_id: child.data().line_id,
                    tel: child.data().tel,  
                    std_id: [...this.state.std_id, child.data().studentID]
                });
                Firebase.firestore().collection('student').doc(id).get()
                .then(doc => {
                    this.setState({
                        std_data : [...this.state.std_data, doc.data()]
                    })
                })
            })
        })
    }
    render(){
        return(
            <div>
                <div class="ui one column stackable center aligned page grid">
                    <div class="column twelve wide">
                        <Grid columns={2}>
                            <Grid.Column>
                                <h2>Parent</h2>
                            </Grid.Column>
                            <Grid.Column>
                                <h2>Student</h2>
                            </Grid.Column>
                        </Grid>
                        {
                            this.state.std_data.map((key,index)=>
                            <Grid columns={2}>
                            <Grid.Column>
                            <Image
                                fluid size='small'
                                src={this.state.parent_url}
                            />
                            <p>Name: {this.state.parent_name}</p>

                            </Grid.Column>

                            <Grid.Column>
                            <Image
                                fluid size='small'
                                src={key.imageURL}
                            />
                            <p>Name: {key.name}</p>
                            <p>Student ID : {key.student_ID}</p>
                            </Grid.Column>
                        </Grid>
                        )
                        }
                    </div>
                </div>
            </div>
        )
    }
}
export default Pick;