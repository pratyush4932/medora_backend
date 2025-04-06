const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables
const prescriptionRoutes = require('./routes/prescriptionRoutes');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use('/prescriptions', prescriptionRoutes);


mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });
