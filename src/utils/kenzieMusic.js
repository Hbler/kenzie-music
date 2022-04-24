const kenzieMusic = class {
  static searchResults = {};
  static async search(musicName) {
    if (musicName.trim() === "") {
      alert("Digite o nome de alguma música.");
      return console.log("Busca inválida!");
    }
    await fetch(`https://simple-spotify-api.herokuapp.com?search=${musicName}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res.data);
        const music = res.data[0];
        if (!music) {
          alert("Música não encontrada!");
          this.searchResults = {};
          return console.log("Música não encontrada!");
        } else {
          this.searchResults = music;
        }
        const results = res.data;
        if (!results) {
          alert("Nenhum resultado encontrado");
          this.searchResults = {};
        } else {
          this.searchResults = results;
        }
      });
  }
};

export default kenzieMusic;
