type Song = {
  id: number;
  title: string;
  artist: string;
  album: string;
  genre: string;
  duration: number;
  favorite: boolean;
  playCount: number;
};

type Playlist = {
  name: string;
  songs: Song[];
  createdDate: Date;
  songCount: number;
};

const songs: Song[] = [
  { id: 1, title: "Song A", artist: "Artist 1", album: "Album X", genre: "Pop", duration: 3, favorite: false, playCount: 0 },
  { id: 2, title: "Song B", artist: "Artist 2", album: "Album Y", genre: "Rock", duration: 4, favorite: false, playCount: 0 },
  { id: 3, title: "Song C", artist: "Artist 1", album: "Album Z", genre: "Pop", duration: 5, favorite: false, playCount: 0 }
];

const playlist: Playlist = {
  name: "My Playlist",
  songs: songs,
  createdDate: new Date(),
  songCount: songs.length
};

const playlistDiv = document.getElementById("playlist")!;
const nowPlayingDiv = document.getElementById("nowPlaying")!;
const genreFilter = document.getElementById("genreFilter") as HTMLSelectElement;
const artistFilter = document.getElementById("artistFilter") as HTMLSelectElement;
const searchInput = document.getElementById("search") as HTMLInputElement;

let recentlyPlayed: [Song?, Song?, Song?, Song?, Song?] = [];

// Render Songs
function renderSongs(songList: Song[]) {
  playlistDiv.innerHTML = "";
  songList.forEach(song => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="https://via.placeholder.com/150">
      <h3>${song.title}</h3>
      <p>${song.artist}</p>
      <p>${song.album}</p>
    `;

    card.onclick = () => playSong(song);
    playlistDiv.appendChild(card);
  });
}

// Play Song
function playSong(song: Song) {
  nowPlayingDiv.innerText = `${song.title} - ${song.artist}`;
  song.playCount++;

  recentlyPlayed.unshift(song);
  recentlyPlayed = recentlyPlayed.slice(0, 5) as any;
}

// Filter by Genre
function filterByGenre(genre: string) {
  return songs.filter(s => genre === "" || s.genre === genre);
}

// Filter by Artist
function filterByArtist(artist: string) {
  return songs.filter(s => artist === "" || s.artist === artist);
}

// Sort function
function sortBy(key: keyof Song) {
  return [...songs].sort((a, b) =>
    a[key] > b[key] ? 1 : -1
  );
}

// Populate artist dropdown
function loadArtists() {
  const artists = [...new Set(songs.map(s => s.artist))];
  artists.forEach(a => {
    const option = document.createElement("option");
    option.value = a;
    option.text = a;
    artistFilter.appendChild(option);
  });
}

// Search
function searchSongs(query: string) {
  return songs.filter(s =>
    s.title.toLowerCase().includes(query.toLowerCase())
  );
}

// Event Listeners
genreFilter.onchange = () => {
  renderSongs(filterByGenre(genreFilter.value));
};

artistFilter.onchange = () => {
  renderSongs(filterByArtist(artistFilter.value));
};

searchInput.oninput = () => {
  renderSongs(searchSongs(searchInput.value));
};

// Init
loadArtists();
renderSongs(songs);
