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
      <hr/>
      <form onSubmit={(e)=>props.handleSubmit(e)}>
        Pizza:<input onChange={props.handlePizzaNameChange} type="text" name="name" value={props.name} />
        Price:<input onChange={props.handlePizzaPriceChange} type="number" name="price" value={props.price}/>
        Size:<input onChange={props.handlePizzaSizeChange} type="text" name="size" value={props.size}/>
        Delivery?<input onChange={props.handlePizzaDeliveryChange} type="checkbox" name="delivery" checked={props.delivery} />
        <input type="submit" value="Add Pizza" />
      </form>
    </div>
  )

}

export default PizzaList;