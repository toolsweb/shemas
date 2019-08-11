require('dotenv').config();

const config = require('./config/index');
const express = require('express');
const passport = require('passport');

const { isAdminAuthenticated, ensureAuthenticated, forwardAuthenticated } = require('./config/auth');

let app = express();

// Config
require('./config/translations')(app);
require('./config/passport')(passport);
const mongoose = require('./config/database')(config);

require('./config/helmet')(app);
require('./config/globale')(app, mongoose);

// Fixtures
//require('./fixtures/index')();


// Routes
app.use('/admin/login', require('./routes/admin/login.js'));
app.use('/admin', isAdminAuthenticated, require('./routes/admin/admin.js'));

app.use('/users', require('./routes/auth/users.js'));
app.use('/api/discord', require('./routes/auth/discord.js'));

app.use('/ask', ensureAuthenticated, require('./routes/ask/ask.js'));
app.use('/brief', require('./routes/brief/brief.js'));

app.use('/', require('./routes/index.js'));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
