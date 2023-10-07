require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 9008;

const connectDB = require('./db/connectDB')
connectDB(process.env.MONGODB_URL)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));

const userController = require('./controllers/userController');

// CRUD Endpoints for Users
app.get('/api/users', userController.getAllUsers);
app.get('/api/users/:id', userController.getUserById);
app.post('/api/users', userController.createUser);
app.put('/api/users/:id', userController.updateUser);
app.delete('/api/users/:id', userController.deleteUser);

app.listen(PORT, () => {
  console.log(`Server is alive on port ${PORT}`);
});
