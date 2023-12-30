const express = require('express')
const mongoose = require("mongoose")

const app = express()
const port = 3000

const Product = require("./models/productModel")

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/blog', (req, res) => {
    res.send('Hello Blog!')
  })

app.get('/products', async(req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

app.get('/products/:id', async(req, res) => {
  try {
    const {id} = req.params;
    const products = await Product.findById(id);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

app.post('/products', async(req, res) => {
  try {
    const products = await Product.create(req.body)
    res.status(200).json(products);
  } catch (error) {
    console.log(error.message)
  }
})

//update record
app.put('/products/:id', async(req, res) => {
  try {
    const {id} = req.params;
    const products = await Product.findByIdAndUpdate(id, req.body);
    
    //no records found
    if(!products){
      return res.status(404).json({message: 'No products found with ID'})
    }

    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);

  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

//delete record
app.delete('/products/:id', async(req, res) => {
  try {
    const {id} = req.params;
    const products = await Product.findByIdAndDelete(id);
    
    //no records found
    if(!products){
      return res.status(404).json({message: 'No products found with ID'})
    }

    res.status(200).json(products);

  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

mongoose.set("strictQuery", false)
mongoose
.connect('mongodb+srv://steenbergenolaf:admin@nodeapi.nifirb6.mongodb.net/NodeAPI?retryWrites=true&w=majority')
.then(() => {
  console.log('Connected!')
  app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
})