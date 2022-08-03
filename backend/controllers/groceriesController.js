const Grocery = require("../models/grocery");
// callback function
module.exports.groceries_get = async (req, res) => {
  try { 
    const groceries = await Grocery.find();
    res.send(groceries);
  } catch (err) {
    console.error(err);
  }
};

module.exports.groceries_post = async (req, res) => {
  const grocery = new Grocery({
    name: req.body.name,
    supermarket: req.body.supermarket,
    quantity: req.body.quantity,
    image: req.body.image,
    done: req.body.done,
  });
  try {
    await grocery.save();
    const groceries = await Grocery.find();
    res.status(201).send(groceries);
  } catch (err) {
    console.error(err);
  }
};

module.exports.groceries_put = async (req, res) => {
  try {
    Grocery.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body }, 
    )
      .then( async()  => {
        const groceries = await Grocery.find();
        res.status(201).send(groceries);
      })
      .catch((err) => {
        console.log("could not update ", err);
      });
  } catch (err) {
    console.error(err);
  }
};

module.exports.groceries_delete = async (req, res) => { 
  try {
    const grocery = await Grocery.findByIdAndDelete(req.params.id);
    if (!grocery) {
      return res.status(404).send("grocery not found");
    }  
    const groceries = await Grocery.find();
    res.status(201).send(groceries);
  } catch (e) {
    res.status(500).send();
    res.json(e);
    console.error(e);
  }
}; 

module.exports.groceries_deleteAll = async (req, res) => { 
  Grocery.remove({}, async function(err) {
    if (err) {
        console.log(err)
    } else {
      const groceries = await Grocery.find();
      res.status(201).send(groceries);
    }
}
);
}; 
