const express = require('express');
const mongoose = require('mongoose');
const Pizza = require('./models/pizza');
const Toppings = require('./models/toppings');

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Connect to Mongo!
mongoose.connect('mongodb://localhost/nme-backend');

app.get('/pizzas', (req, res) => {
  // find one
  Pizza.find({}, function(err, pizzas) {
    if (err) res.json(err)
    res.json(pizzas)
  })
});

// get one pizza
app.get('/pizzas/:id', (req, res) => {
  Pizza.findById(req.params.id).populate('toppings').exec( (err, pizza) => {
    if (!err) {
      res.status(200).json(pizza);
    } else {
      res.status(500).json(err);
    }
  })
})

// create one pizza
app.post('/pizzas', (req, res) => {
  Pizza.create({
    name: req.body.name,
    price: req.body.price,
    size: req.body.size,
    delivery: req.body.delivery
  }, function(err, pizzas) {
    res.json(pizzas)
  })
})

// update one pizza
app.put('/pizzas/:id', (req, res) => {
  Pizza.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    price: req.body.price,
    size: req.body.size,
    delivery: req.body.delivery
  }, {
    new: true
  }, (err, pizza) => {
    res.status(203).json(pizza);
  });
});


// app.get('/pizzaupdate/:name', (req, res) => {
//   Pizza.findOneAndUpdate({name: req.params.name},
//   {$set:
//     {name: req.body.name,
//     price: req.body.price,
//     size: req.body.size,
//     delivery: req.body.delivery} 
//   },{new:true}, function(err, pizzas) {
//     if (err) res.json(err)
//     res.json(pizzas)
//   })
// })

app.delete('/:id', (req, res) => {
  Pizza.findByIdAndRemove(req.params.id, function(err, pizzas) {
    if (err) res.json(err);
    res.json({message: "DELETED!", pizzas})
  })
})

// app.get('/:name', (req, res) => {
//   Pizza.findOne({name: req.params.name}, function(err, pizza) {
//     if (err) res.json(err)
//     res.json(pizza)
//   })
// })

// GET /api/pizzas/:qid/toppings -  Get all toppings associated with given pizza
app.get('/pizzas/:pid/toppings', (req, res) => {
  Pizza.findById(req.params.pid).populate('toppings').exec((err, pizza) => {
    res.status(200).json(pizza.toppings);
  })
})

// Gets one toppping associated with that pizza
app.get('/pizzas/:pid/toppings/:tid', (req, res) => {
  Toppings.findById(req.params.tid, (err, topping) => {
    res.json(topping)
  })
})

// Creates a new topping for that pizza
app.post('/pizzas/:id/toppings', (req, res) => {
  Pizza.findById(req.params.id, function(err, pizza) {
    Toppings.create({name: req.body.name}, function(err, topping){
      pizza.toppings.push(topping._id)
      pizza.save(function(err, pizza) {
        //err handleing
        if (err) res.json(err)
        res.json(pizza)
    })
    })
  })
})

// Deletes one topping from one pizza
app.delete('/pizzas/:pid/toppings/:tid', (req, res) => {
  Pizza.findById(req.params.pid, (err, pizza) => {
    pizza.toppings.pull(req.params.tid)
    pizza.save(err => {
      if (err) res.json(err)
      Toppings.deleteOne({_id: req.params.tid}, err => {
        if (err) res.json(err)
        res.json(1);
      })
    })
  })
})

app.listen(3001, () => {
  console.log('Up and running')
})