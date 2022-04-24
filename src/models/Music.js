//// Model
// Classe Música: Atributos -> id, nome, artistas, duração, url
class Music {
  constructor(id, name, artists, duration_ms, url) {
    this.id = id;
    this.name = name;
    this.artists = artists;
    this.duration_ms = duration_ms;
    this.url = url;
  }

  // methods
  infoContainer() {
    const container = document.createElement("div");
    const name = document.createElement("h4");
    const artist = document.createElement("p");

    name.innerText = this.name;
    artist.innerText = this.artists[0].name;

    container.classList.add("musicList__item--info");
    container.append(name, artist);

    return container;
  }
}

//// Export
export { Music };
