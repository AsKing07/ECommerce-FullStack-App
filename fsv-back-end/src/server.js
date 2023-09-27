import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import path from 'path';
import history from 'connect-history-api-fallback'
require('dotenv').config();


  

const app = express();
app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, '../assets')));

app.use(express.static(path.resolve(__dirname, '../dist'), { maxAge: '1y', etag: false }))
app.use(history());

app.get('/api/products', async (req, res) => {

    const client = await MongoClient.connect(`mongodb+srv://Asking:${process.env.MONGO_PASS}@${process.env.DATABASE}.azsoilg.mongodb.net/?retryWrites=true&w=majority`);

    const db = client.db('ECommerceWebSite');
    const products = await db.collection('products').find({}).toArray();

    res.status(200).json(products);
    client.close();
});

app.get('/api/users/:userId/cart', async (req, res) => 
{
    const { userId } = req.params;
    const client = await MongoClient.connect(`mongodb+srv://Asking:${process.env.MONGO_PASS}@${process.env.DATABASE}.azsoilg.mongodb.net/?retryWrites=true&w=majority`);

    const db = client.db('ECommerceWebSite');  

    const user = await db.collection('users').findOne({ id: userId });
    if (!user) return res.status(404).json('Utilisateur introuvable!');

    const products = await db.collection('products').find({}).toArray();

    const cartItemIds = user.cartItems;

    const cartItems = cartItemIds.map(id => products.find(product => product.id === id));

    res.status(200).json(cartItems);
    client.close();
  });

app.get('/api/products/:productId', async (req, res) => {

    const client = await MongoClient.connect(`mongodb+srv://Asking:${process.env.MONGO_PASS}@${process.env.DATABASE}.azsoilg.mongodb.net/?retryWrites=true&w=majority`);
    const db = client.db('ECommerceWebSite');

    const { productId } = req.params;
    const product = await db.collection('products').findOne({id: productId})


    if (product) {
        res.status(200).json(product);
    } else {
        res.status(404).json('Produit introuvable !');
    }
})

app.post('/api/users/:userId/cart', async (req, res) =>
{

    const client = await MongoClient.connect(`mongodb+srv://Asking:${process.env.MONGO_PASS}@${process.env.DATABASE}.azsoilg.mongodb.net/?retryWrites=true&w=majority`);
    const db = client.db('ECommerceWebSite');

    const { userId } = req.params;

    const { productId } = req.body;

    const products = await db.collection('products').find({}).toArray();

    await db.collection('users').updateOne({ id: userId }, {
        $addToSet: { cartItems: productId } 
    });

    const user = await db.collection('users').findOne({ id: userId });

    const cartItemIds = user.cartItems;
    const cartItems = cartItemIds.map(id => products.find(product => product.id === id));

    res.status(200).json(cartItems);

    client.close();
})

app.delete ('/api/users/:userId/cart/:productId', async (req, res) =>
{
    const { userId, productId } = req.params;

    const client = await MongoClient.connect(`mongodb+srv://Asking:${process.env.MONGO_PASS}@${process.env.DATABASE}.azsoilg.mongodb.net/?retryWrites=true&w=majority`);
    const db = client.db('ECommerceWebSite');

    await db.collection('users').updateOne({ id: userId }, { $pull: { cartItems: productId },});

    const user = await db.collection('users').findOne({ id: userId });

    const products = await db.collection('products').find({}).toArray();

    const cartItemIds = user.cartItems;
    const cartItems = cartItemIds.map(id => products.find(product => product.id === id));
    
      res.status(200).json(cartItems);
      client.close();

});

app.get('*', (req, res) =>
{
    res.sendFile(path.join(__dirname, '../dist/index.html'))
})

app.listen(8000, () => {
    console.log('Server is listening on port 8000');
});