const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    if (process.env.NODE_ENV === 'production') {
      await mongoose.connect(
        `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@devconnector-l78xb.mongodb.net/tgr?retryWrites=true&w=majority`,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
          useFindAndModify: false
        }
      );
      console.log('MongoDB Atlas Connected');
    } else {
      await mongoose.connect('mongodb://localhost:27017/tgr', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
      });
      console.log('MongoDB Localhost Connected');
    }
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
