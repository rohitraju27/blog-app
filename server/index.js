const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userRoute = require('./routes/user.js');
const blogRoute = require('./routes/blog.js');

dotenv.config();

const app = express();

app.use(cors());

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

app.use('/user', userRoute);
app.use('/blog', blogRoute);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI, {
    dbName: 'blog_posts',
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => {
      console.log('Connection to database complete');
      console.log(`Server running on port ${PORT}`);
    })
  )
  .catch((error) => console.log(error));
