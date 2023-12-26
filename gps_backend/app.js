const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); // Import body-parser
const Detail = require('./models/vehicles');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' })); // Increase payload size limit

const dbURI = "mongodb://localhost:27017/Travel";

mongoose.connect(dbURI)
  .then(result => app.listen(3001))
  .catch(err => console.log(err));

app.post('/', async (req, res) => {
  try {
    
    const directionsData = req.body;
    
    for (let i = 1; i <= 300; i++) {
      const newDetail = new Detail({
        title: i,
        start_location: directionsData.routes[0].legs[0].start_location,
        end_location: directionsData.routes[0].legs[0].end_location,
        values: directionsData.routes[0].overview_path,
        speed: directionsData.routes[0].legs[0].distance.text ,
      });
      await newDetail.save();
    }
    res.status(200).json({ message: 'Success' });
  } catch (error) {
    console.error('Error creating documents:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
