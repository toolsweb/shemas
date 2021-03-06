'use strict';

/**
 * Expose
 */


module.exports = {
  mongoURI: process.env.MONGODB_URL || 'mongodb://mongo/test',
  discord: {
    client_id: process.env.DISCORD_CLIENT_ID,
    client_secret: process.env.DISCORD_CLIENT_SECRET,
    callbackURL: `http://toolsweb.ovh/api/discord/callback`
  }
};