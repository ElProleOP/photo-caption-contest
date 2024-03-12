const express = require('express');
const app = express();
const morgan = require('morgan');
const helmet = require('helmet');
require('dotenv').config();
const db = require('./config/config');
const path = require('path');

//setup middleware
app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));

//setup routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

//setup routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/protected', require('./routes/protectedRoutes'));
app.use('/api/captions', require('./routes/captionRoutes'));
app.use('/api/docs', require('./routes/docs'))

const PORT = 3000;
//sync database
db.sequelize.sync({ force: false }).then(() => {
    console.log('Database synced successfully');
});
app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
});

module.exports = app;