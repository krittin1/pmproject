import React,{Component} from 'react';
import{Link} from 'react-router-dom';
import { Menu, Segment } from 'semantic-ui-react';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = { activeItem: 'home' }
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })


    render() { 
        
        return(
            <div>
        <Menu pointing secondary>
          <Link to="/">
            <Menu.Item
                name='home'
                active={this.state.activeItem === 'home'}
                onClick={this.handleItemClick}
            />
          </Link>
          <Link to="/detect">
            <Menu.Item
                name='detect'
                active={this.state.activeItem === 'detect'}
                onClick={this.handleItemClick}
            />
          </Link>
          <Link to="/addstudent">
            <Menu.Item
                name='add student'
                active={this.state.activeItem === 'add student'}
                onClick={this.handleItemClick}
            />
          </Link>
          <Link to="/addparent">
            <Menu.Item
                name='add parents'
                active={this.state.activeItem === 'add parents'}
                onClick={this.handleItemClick}
            />
          </Link>
          <Menu.Menu position='right'>
            <Menu.Item
              name='logout'
              active={this.state.activeItem === 'logout'}
              onClick={this.handleItemClick}
            />
          </Menu.Menu>
        </Menu>
      </div>
        )
    }
}
export default Header;