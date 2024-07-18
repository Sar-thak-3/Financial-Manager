const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const savingsGoalRoutes = require('./routes/savingsGoalRoutes');

const app = express();

app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/transactions', transactionRoutes);
app.use('/categories', categoryRoutes);
app.use('/savings-goals', savingsGoalRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});