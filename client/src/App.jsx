import React from 'react';
import axios from 'axios';
import './App.css';
import PizzaList from './PizzaList';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pizzas: []
    }
  }

  componentDidMount() {
    axios.get('/pizzas')
    .then(res => {
      this.setState({
        pizzas: res.data
      })
    })
  }

  render() {
    return (
      <div className='App'>
        <PizzaList pizzas={this.state.pizzas} />
      </div>
    )
  }


}



export default App;
