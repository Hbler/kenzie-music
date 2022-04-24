//// Imports
import kenzieMusic from "../utils/kenzieMusic.js";

//// Model
// Classe Música: Atributos -> id, nome, artistas, duração, url
// Atributo Estático -> musicaAtual da classe kenzieMusic
class Music extends kenzieMusic {
  constructor(id, name, artists, duration_ms, url) {
    this.id = id;
    this.name = name;
    this.artists = artists;
    this.duration_ms = duration_ms;
    this.url = url;
  }
}

//// Export
export { Music };
