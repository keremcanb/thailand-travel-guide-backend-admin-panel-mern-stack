const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const path = require('path');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

connectDB();

app.use(fileUpload());
app.use(compression());
app.use(helmet());
app.use(cors());

app.use(express.json({ extended: false }));
app.use(express.static('public'));

app.use('/api', require('./routes/api/items'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));

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

// file upload api
// app.post('/upload', (req, res) => {
//   if (!req.files) {
//     return res.status(500).send({ msg: 'file is not found' });
//   }
//   // accessing the file
//   const myFile = req.files.file;
//   //  mv() method places the file inside public directory
//   myFile.mv(`${__dirname}/public/${myFile.name}`, function (err) {
//     if (err) {
//       console.log(err);
//       return res.status(500).send({ msg: 'Error occured' });
//     }
//     // returing the response with file path and name
//     return res.send({ name: myFile.name, path: `/${myFile.name}` });
//   });
// });

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
