const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

export async function instantiateDb() {
  await mongoose
    .connect(process.env.DB_CONNECT, options)
    .then(() => console.log('MongoDB is connected'))
    .catch((err) => console.log(err));
}
