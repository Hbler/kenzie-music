//// Imports
import { playMusic } from "../script.js";

//// Model
class Playlist {
  constructor(name, user) {
    this.name = name;
    this.user = user;
    this.musics = [];
    this.archive = [];
    this.showArchive = false;
    this.visible = [];
  }

  // event handler
  handleEvent(e) {
    const btn = e.target.id || e.target.closest("button").id;
    console.log(btn);
    let artist =
      e.target.dataset.artist || e.target.closest("button").dataset.artist;
    let id = e.target.dataset.music || e.target.closest("button").dataset.music;

    switch (btn) {
      case "filter-btn":
        this.filter(artist);
        break;
      case "showAll-btn":
        this.filter();
        break;
      case "archive-btn":
        this.archiveMusic(id);
        break;
      case "restore-btn":
        this.restoreMusic(id);
        break;
    }
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
        this.visible.sort((a, b) => {
          const nameA = a.artists[0].name.toUpperCase();
          const nameB = b.artists[0].name.toUpperCase();
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;

          return 0;
        });
        break;
      case "id":
        this.visible.sort((a, b) => a.id < b.id);
        break;
      default:
        this.visible.sort((a, b) => {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;

          return 0;
        });
        break;
    }

    this.render();
  }

  archiveMusic(id) {
    let index = this.musics.findIndex((obj) => obj.id === id);

    this.archive.push(this.musics[index]);
    this.musics.splice(index, 1);
    this.filter();
    this.render();
  }

  restoreMusic(id) {
    let index = this.archive.findIndex((obj) => obj.id === id);

    this.musics.push(this.archive[index]);
    this.archive.splice(index, 1);
    this.filter();
    this.render();
  }

  filter(name = "all") {
    if (name !== "all") {
      const found = this.musics.filter(
        ({ artists }) => artists[0].name === name
      );
      this.visible.splice(this.visible.length);
      this.visible = [...found];
    } else {
      this.visible.splice(this.visible.length);
      this.visible = [...this.musics];
    }

    this.render();
  }

  render() {
    const musicList = document.getElementById("musicList");
    const duration = document.getElementById("duration");

    musicList.innerHTML = "";
    duration.innerText = this.calcDuration();

    this.visible.forEach((obj) => {
      const card = this.musicCardPlaylist(obj);
      musicList.appendChild(card);
    });

    const container = document.querySelector(".container");

    this.archive.length === 0
      ? (this.showArchive = false)
      : (this.showArchive = true);

    if (this.showArchive) {
      const archive = document.querySelector(".archive");
      const archiveList = document.getElementById("archiveList");

      if (container.classList.contains("no-archive")) {
        container.classList.toggle("no-archive");
        container.classList.toggle("w-archive");
      }

      if (archive.classList.contains("clear")) {
        archive.classList.toggle("clear");
      }

      archiveList.innerHTML = "";

      this.archive.forEach((obj) => {
        const card = this.musicCardArchive(obj);
        archiveList.appendChild(card);
      });
    } else if (
      this.archive.length === 0 &&
      container.classList.contains("w-archive")
    ) {
      const archive = document.querySelector(".archive");
      const archiveList = document.getElementById("archiveList");

      container.classList.toggle("w-archive");
      container.classList.toggle("no-archive");

      if (!archive.classList.contains("clear")) {
        archive.classList.toggle("clear");
      }

      archiveList.innerHTML = "";
    }
  }

  calcDuration() {
    let duration = this.visible.reduce((t, obj) => t + obj.duration_ms, 0);
    let text = this.convertTime(duration);

    return text;
  }

  convertTime(time) {
    switch (true) {
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

  musicCardPlaylist(obj) {
    const container = document.createElement("li");
    const info = obj.infoContainer();
    const playBtn = document.createElement("button");
    const filters = document.createElement("div");
    const filterBtn = document.createElement("button");
    const showAllBtn = document.createElement("button");
    const archiveBtn = document.createElement("button");

    playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    playBtn.id = obj.id;
    playBtn.addEventListener("click", playMusic);

    filterBtn.innerText = "filter artist";
    filterBtn.id = "filter-btn";
    filterBtn.dataset.artist = `${obj.artists[0].name}`;
    filterBtn.addEventListener("click", this);

    showAllBtn.innerText = "show all";
    showAllBtn.id = "showAll-btn";
    showAllBtn.addEventListener("click", this);

    archiveBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    archiveBtn.id = "archive-btn";
    archiveBtn.dataset.music = obj.id;
    archiveBtn.addEventListener("click", this);

    filters.classList.add("musicList__item--filters");
    filters.append(filterBtn, showAllBtn);

    container.classList.add("musicList__item");
    container.append(info, playBtn, filters, archiveBtn);

    return container;
  }

  musicCardArchive(obj) {
    const container = document.createElement("li");
    const info = obj.infoContainer();
    const restoreBtn = document.createElement("button");

    restoreBtn.innerHTML = '<i class="fa-solid fa-rotate-left"></i>';
    restoreBtn.id = "restore-btn";
    restoreBtn.dataset.music = obj.id;
    restoreBtn.addEventListener("click", this);

    container.classList.add("archiveList__item");
    container.append(info, restoreBtn);

    return container;
  }
}

////Export
export default Playlist;
