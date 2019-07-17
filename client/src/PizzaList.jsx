import React from 'react';


const PizzaList = props => {
  let pizzas;
  if ( props.pizzas.length ) {
    pizzas = props.pizzas.map((pizza, index) => {
      return <p className='pizzarow' key={index}>{pizza.name}</p>
    })
  } else {
    pizzas = <p>No Pizza Data!</p>
  }
  return (
    <div className="PizzaList">
      <h3>All the Pizzas:</h3>
      {pizzas}
    </div>
  )

}

export default PizzaList;