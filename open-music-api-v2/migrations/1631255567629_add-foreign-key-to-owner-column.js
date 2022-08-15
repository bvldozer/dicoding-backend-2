/* eslint-disable camelcase */

exports.up = (pgm) => {
  // membuat user baru.
  pgm.sql("INSERT INTO users(id, username, password, fullname) VALUES ('old_songs', 'old_songs', 'old_songs', 'old songs')");

  // mengubah nilai owner pada playlist yang owner-nya bernilai NULL
  pgm.sql("UPDATE playlists SET owner = 'old_songs' WHERE owner = NULL");

  // memberikan constraint foreign key pada owner terhadap kolom id dari tabel users
  pgm.addConstraint('playlists', 'fk_songs.owner_users.id', 'FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
  // menghapus constraint fk_songs.owner_users.id pada tabel playlists
  pgm.dropConstraint('playlists', 'fk_songs.owner_users.id');

  // mengubah nilai owner old_songs pada playlist menjadi NULL
  pgm.sql("UPDATE playlists SET owner = NULL WHERE owner = 'old_songs'");

  // menghapus user baru.
  pgm.sql("DELETE FROM users WHERE id = 'old_songs'");
};
