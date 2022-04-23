import kenzieMusic from "./utils/kenzieMusic.js";

/* Para conseguir buscar uma musica utilize esse método abaixo */
// await kenzieMusic.buscaMusica("nome da musica ou artista");

/* Para conseguir acessar a musica que você buscou */
// console.log(kenzieMusic.musicaAtual);

// Comece seu código a partir desse comentário.



// Lógica responsável pela busca de músicas digitadas no site.
const searchButton = document.getElementById("searchButton");

searchButton.addEventListener("click", async () => {
  const input = document.getElementById("inputMusic");
  await kenzieMusic.buscaMusica(input.value)
  input.value = "";
  // console.log(kenzieMusic.musicaAtual);
})




