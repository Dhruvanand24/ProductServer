const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Update the origin to match your deployed React app's URL on Vercel
const allowedOrigin = 'https://product-manager-one.vercel.app';

app.use(cors({
  origin: allowedOrigin,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
  allowedHeaders: 'Content-Type,Authorization',
}));

const shopifyApiKey = '20413f9029c695a6bb194d66f1b34b82';
const shopifyApiSecret = '45b70d9bae602557f168f0120ca9cdb5';
const shopifyStore = 'made2automate';
const adminApiAccessToken = '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';

// Endpoint to add a product
app.get('/ping', (req, res) => {
  res.send("server pinged!!");
});

app.get('/', (req, res) => {
  // Send HTML response with h1 tags
  res.send('<h1>Welcome to made2automate product manager server</h1>');
});

app.post('/add-product', async (req, res) => {
  try {
    const productData = req.body;
    
    

    // Make a request to Shopify API to add the product
    const response = await axios.post(
      `https://${shopifyStore}.myshopify.com/admin/api/2021-07/products.json`,
      { product: productData },
      {
        headers: {
          'X-Shopify-Access-Token': adminApiAccessToken,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
