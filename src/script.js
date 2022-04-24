//// Imports
import kenzieMusic from "./utils/kenzieMusic.js";
import { Playlist } from "./models/Playlist.js";
import { Music } from "./models/Music.js";

/* Para conseguir buscar uma musica utilize esse método abaixo */
// await kenzieMusic.buscaMusica("nome da musica ou artista");

/* Para conseguir acessar a musica que você buscou */
// console.log(kenzieMusic.searchResults);

// Comece seu código a partir desse comentário.

// Lógica responsável pela busca de músicas digitadas no site.

//// Global Variables
//// Functions
//// Flow
const searchButton = document.getElementById("searchButton");

searchButton.addEventListener("click", async () => {
  const input = document.getElementById("inputMusic");
  await kenzieMusic.search(input.value);
  input.value = "";
  console.log(kenzieMusic.searchResult);
});
