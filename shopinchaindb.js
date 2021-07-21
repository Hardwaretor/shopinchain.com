const fs = require('fs')
const bodyParser = require('body-parser')
const jsonServer = require('json-server')


const server = jsonServer.create()

const productdb = JSON.parse(fs.readFileSync('./back-end/db/products.json', 'UTF-8'))


server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(jsonServer.defaults());

server.get('/api/products', (req, res) => {
  const products = productdb.products;
  res.status(200).json(products)

})

// Create a token from a payload 


// Verify the token 


// Check if the user exists in database


////////////////////////////// New User ////////////////////////////////


////////////////////////////// New Admin ////////////////////////////////


////////////////////////// Authenticate ///////////////////////////


////////////////////////// Admin Authenticate ///////////////////////////



/////////////////////////////// Refresh-Token ////////////////







/////////////////////////////////////////////////////// Files ///////////////////////////////////////////////////

// New File



// SET STORAGE



server.listen(5000, () => {
  console.log('ShopInChain API on port 5000')
})
