const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./Config/db');
dotenv.config();

const app = express();

app.use(cors({origin:'*'}));
app.use(express.json());

app.use('/api/users', require('./Routes/userRoutes'));
app.use('/api/products', require('./Routes/productRoutes'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
connectDB();
