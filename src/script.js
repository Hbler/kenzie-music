//// Imports
import kenzieMusic from "./utils/kenzieMusic.js";
import Playlist from "./models/Playlist.js";
import { Music } from "./models/Music.js";

//// Global Variables
const searchButton = document.getElementById("searchButton");
const searchResults = document.getElementById("searchResults");
const sortName = document.getElementById("sort-name");
const sortArtist = document.getElementById("sort-artists");
const kenziePlaylist = new Playlist("Kenzie", "Hbler");
const playerBox = document.querySelector(".audio__box--player");
// const musicTitle = document.getElementById("now-playing");
// const musicPlayer = document.getElementById("player");

//// Listeners
searchButton.addEventListener("click", async () => {
  const input = document.getElementById("inputMusic");
  await kenzieMusic.search(input.value);
  input.value = "";
  showResults();
});

sortName.addEventListener("click", () => {
  kenziePlaylist.sortMusics();
});

sortArtist.addEventListener("click", () => {
  kenziePlaylist.sortMusics("artists");
});

//// Functions
function showResults() {
  const results = kenzieMusic.searchResults;
  searchResults.innerHTML = "";

  if (!(Object.keys(results).length === 0 && results.constructor === Object)) {
    results.forEach((obj) => {
      const { name, id, artists } = obj;
      const container = document.createElement("li");
      const info = document.createElement("div");
      const nameEl = document.createElement("h5");
      const artistEl = document.createElement("small");
      const btn = document.createElement("button");

      nameEl.innerText = name;
      artistEl.innerHTML = artists[0].name;
      btn.innerText = "Add";
      btn.addEventListener("click", callPlaylist);
      btn.id = id;

      info.append(nameEl, artistEl);
      container.append(info, btn);
      container.classList.add("search__results--result");

      searchResults.appendChild(container);
    });
  }
}

function callPlaylist() {
  const musicObj = kenzieMusic.searchResults.find(({ id }) => id === this.id);
  const { id, name, artists, duration_ms, music_url } = musicObj;
  const musicInstance = new Music(id, name, artists, duration_ms, music_url);

  kenziePlaylist.addMusic(musicInstance);
}

function playMusic() {
  const id = this.id;
  const music = kenziePlaylist.musics.find((obj) => obj.id === id);
  const title = `${music.name} - ${music.artists[0].name}`;

  createPlayer(music.url, title);
}

function createPlayer(src, title) {
  const musicTitle = document.createElement("h2");
  const musicPlayer = document.createElement("audio");
  const source = document.createElement("source");

  musicTitle.innerText = "Now Playing " + title;

  musicPlayer.id = "player";
  musicPlayer.setAttribute("controls", "controls");
  musicPlayer.setAttribute("preload", "auto");
  musicPlayer.setAttribute("autoplay", "autoplay");

  source.src = src;
  musicPlayer.appendChild(source);

  playerBox.innerHTML = "";
  playerBox.append(musicTitle, musicPlayer);
}

//// Export
export { playMusic };
