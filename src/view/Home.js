import React,{Component} from 'react';
import Firebase from '../Firebase';
import {Link} from 'react-router-dom';
import { Item, Button } from 'semantic-ui-react';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            item: []
         };
    }

    componentDidMount = () =>{
        Firebase.firestore()
        .collection('student').get()
        .then(snapshot =>{
            if (snapshot.empty) {
                console.log('No matching documents.');
                return;
            }  
            var myData = '[';
            snapshot.forEach(doc => {
                myData += '{'
                myData += '"id" : "' + doc.id + '",'
                myData += '"name" : "' + doc.data().name + '",'
                myData += '"stdId" : "' + doc.data().stdId + '",'
                myData += '"imageURL" : "' + doc.data().imageURL + '",'
                myData += '"address" : "' + doc.data().address + '"'
                myData += '},'
            });
            myData = myData.substring(0,myData.length-1);
            myData += ']';
            var Json = JSON.parse(myData);
            Json.forEach(doc=>{
                this.setState({
                data: [...this.state.data,doc],
                item: [...this.state.data,doc]
            })
            })

        }).catch(err => {
            console.log('Error getting documents', err);
        });
    }

    handleSearched = (e) =>{
        this.setState({ 
            word: e.target.value
        })
    }


    filterList = (e) => {
        let items = this.state.data;
        this.setState({word: e.target.value});
        items = items.filter((item) => {
          return item.name.toLowerCase().search(e.target.value.toLowerCase()) !== -1;
        });
        this.setState({item: items});
      }

    render() { 
        return(
            <div>
                <br/>
                <div class="ui one column stackable center aligned page grid">
                    <div class="column twelve wide">
                        <div className="ui icon input">
                            <input  type="text" 
                                    placeholder="Search..."
                                    onChange={this.filterList}
                                    value = {this.state.word} />
                            <i class="search icon"></i>
                        </div>
                    </div>
                </div>
                {
                    this.state.item.map((key,index)=>
                        <div>
                            <Item.Group>
                                <Item>
                                <Item.Image size='tiny' src={key.imageURL} />

                                <Item.Content>
                                    <Item.Header as='a'>{key.name}</Item.Header>
                                    <Item.Meta>Student ID: {key.stdId}</Item.Meta>
                                    <Item.Description>
                                    {key.address}
                                    </Item.Description>
                                    <Item.Extra> 
                                        <Link to={'/show/'+key.id}>
                                            <Button inverted color='blue'>
                                                Show Profile
                                            </Button>
                                        </Link>
                                    </Item.Extra>
                                </Item.Content>
                                </Item>
                            </Item.Group>
                        </div>
                    )
                }
            </div>
        )
    }
}

export default Home;