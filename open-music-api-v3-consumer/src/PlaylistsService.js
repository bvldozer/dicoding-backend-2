const { Pool } = require('pg');

class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylists(playlistId) {
    const query = {
      text: `SELECT songs.id, songs.title, songs.performer, songs.genre, songs.duration FROM playlists
        LEFT JOIN collaborations ON collaborations.playlist_id = playlists.id
        LEFT JOIN playlistsongs ON playlists.id = playlistsongs.playlist_id
        LEFT JOIN songs ON playlistsongs.song_id = songs.id
        WHERE playlists.id = $1
        GROUP BY songs.id, songs.title, songs.performer, songs.genre, songs.duration`,
      values: [playlistId],
    };
    const result = await this._pool.query(query);
    return result.rows;
  }
}

module.exports = PlaylistsService;
