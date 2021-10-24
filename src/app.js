const express = require('express');
const cors = require('cors');
const logger = require('morgan');

const db = require('./models');
const dbConfig = require("./config/db.config");

// require routes
const indexRouter = require('./routes');
const authRouter = require('./routes/auth');
const avatarRouter = require('./routes/avatar');

const app = express();

const corsOptions = {
    origin: "http://localhost:*"
};

app.use(logger('dev'));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

db.mongoose.connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/avatar', avatarRouter);

module.exports = app;
