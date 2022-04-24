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
        const results = res.data;
        if (results.length === 0) {
          alert("Nenhum resultado encontrado");
          this.searchResults = {};
        } else {
          this.searchResults = results;
          return this.searchResults;
        }
      });
  }
};

export default kenzieMusic;
