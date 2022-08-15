const Joi = require('joi');

const PlaylistSongsPayloadSchema = Joi.object({
  songId: Joi.string().pattern(new RegExp('song-([^]*)')).required(),
});

module.exports = { PlaylistSongsPayloadSchema };
