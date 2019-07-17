import React from 'react';
import axios from 'axios';
import './App.css';
import PizzaList from './PizzaList';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pizzas: [],
      pizzaName: '',
      pizzaPrice: '',
      pizzaSize: '',
      pizzaDelivery: ''
    }
    this.handlePizzaNameChange = this.handlePizzaNameChange.bind(this);
    this.handlePizzaPriceChange = this.handlePizzaPriceChange.bind(this);
    this.handlePizzaSizeChange = this.handlePizzaSizeChange.bind(this);
    this.handlePizzaDeliveryChange = this.handlePizzaDeliveryChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault()
    let {pizzaName, pizzaPrice, pizzaSize, pizzaDelivery} = this.state
    axios.post('/pizzas', {
      name: pizzaName,
      price: pizzaPrice,
      size: pizzaSize,
      delivery: pizzaDelivery
    }).then((response) => {
      axios.get('/pizzas').then((res) => {
        this.setState({
          pizzas: res.data
        })
      })
    })
  }

  handlePizzaNameChange(e) {
    this.setState({
      pizzaName: e.target.value
    })
  }

  handlePizzaPriceChange(e) {
    this.setState({
      pizzaPrice: e.target.value
    })
  }

  handlePizzaSizeChange(e) {
    this.setState({
      pizzaSize: e.target.value
    })
  }

  handlePizzaDeliveryChange(e) {
    this.setState({
      pizzaDelivery: e.target.checked
    })
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
        <PizzaList pizzas={this.state.pizzas} 
                    handlePizzaNameChange={this.handlePizzaNameChange}
                    handlePizzaPriceChange={this.handlePizzaPriceChange}
                    handlePizzaSizeChange={this.handlePizzaSizeChange}
                    handlePizzaDeliveryChange={this.handlePizzaDeliveryChange} 
                    name={this.state.pizzaName}
                    price={this.state.pizzaPrice}
                    size={this.state.pizzaSize}
                    delivery={this.state.pizzaDelivery} 
                    handleSubmit={this.handleSubmit} />
      </div>
    )
  }


}



export default App;
