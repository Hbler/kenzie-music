//// Model
class Playlist {
  constructor(name, user) {
    this.name = name;
    this.user = user;
    this.musics = [];
    this.archive = [];
    this.visible = [];
  }

  // methods
  addMusic(obj) {
    if (!this.musics.includes(obj)) this.musics.push(obj);
    this.filter();
    this.sortMusics();
  }

  sortMusics(by = "name") {
    switch (by) {
      case "artists":
        this.visible.sort((a, b) => a.artist < b.artists);
        break;
      case "id":
        this.visible.sort((a, b) => a.id < b.id);
        break;
      default:
        this.visible.sort((a, b) => a.name < b.name);
        break;
    }
  }

  removeMusic(id) {
    let index = this.musics.findIndex((obj) => obj.id === id);
    this.archive.push(this.musics[index]);
    this.musics.splice(index, 1);
  }

  filter(name = "all") {
    if (name !== "all") {
      const found = this.musics.filter(({ artists }) => artists === name);
      this.visible.splice(this.visible.length);
      this.visible = [...found];
    } else {
      this.visible.splice(this.visible.length);
      this.visible = [...this.musics];
    }
  }

  calcDuration() {
    let pDuration = this.musics.reduce((t, obj) => t + obj.duration_ms, 0);
    let vDuration = this.visible.reduce((t, obj) => t + obj.duration_ms, 0);

    let playlistText = this.convertTime(totalDuration);
    let visibleText = this.convertTime(displayedDuration);
  }

  convertTime(time) {
    switch (time) {
      case time > 3.6e6:
        return `${(time / 3.6e6).toFixed(3)} h`;
        break;
      case time > 60000:
        return `${(time / 60000).toFixed(2)} m`;
        break;
      default:
        return `${(time / 1000).toFixed(2)} s`;
    }
  }
}

////Export
export { Playlist };
