const PlaylistSongsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'playlistsongs',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const playlistsHandler = new PlaylistSongsHandler(service, validator);
    server.route(routes(playlistsHandler));
  },
};
