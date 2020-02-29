import React,{Component} from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import './App.css';
import Home from './view/Home';
import Header from './component/Header';
import Detect from './view/Detect';
import AddStudent from './view/AddStudent';
import AddParent from './view/AddParent';
import Show from './view/Show';
import Edit from './view/Edit';
import ShowParent from './view/ShowParent';
import Pick from './view/Pick';

class App extends Component {
  render() { 
    return(
      <div className="ui container">
        <Router>
            <Header/>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/detect" component={Detect}/>
              <Route path="/addstudent" component={AddStudent}/>
              <Route path="/addparent/:id" component={AddParent}/>
              <Route path="/show/:id" component={Show}/>
              <Route path="/edit/:id" component={Edit}/>
              <Route path="/showparent/:id" component={ShowParent}/>
              <Route path="/pick/:id" component={Pick}/>
            </Switch>
        </Router>
      </div>
    )
  }
}

export default App;
