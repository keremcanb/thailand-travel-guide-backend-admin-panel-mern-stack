const express = require('express');
const mongoose = require('mongoose');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const fileUpload = require('express-fileupload');
require('dotenv').config();

const app = express();

// Connect Database
mongoose.connect(
  // `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@devconnector-l78xb.mongodb.net/tgr?retryWrites=true&w=majority`,
  'mongodb://localhost:27017/tgr',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  },
  (err) => {
    if (err) throw err;
    console.log('Mongodb connected');
  }
);

// Init Middleware
app.use(fileUpload());
app.use(compression());
app.use(cors());
app.use(helmet());
app.use(express.json({ extended: false }));
app.use(express.static('public'));

// Define Routes
app.use('/api', require('./routes/api/items'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));

// Upload
app.post('/upload', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const { file } = req.files;

  file.mv(`${__dirname}/public/${file.name}`, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    res.json({ fileName: file.name, filePath: `/${file.name}` });
  });
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
