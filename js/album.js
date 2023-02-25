let container = document.querySelector(`.album`);
let playlist = document.querySelector(`.playlist`);
let search = new URLSearchParams(window.location.search);
let i = search.get(`i`);
let album = albums[i];

if (!album) {
    container.innerHTML = `Переход на главную страницу`;
    setTimeout(() => {
        window.location.pathname = `index.html`;
    }, 5000);
} else {

    container.innerHTML = `
    <div class="card mb-3">
        <div class="row">
            <div class="col-4">
                <img src="${album.img}" alt="" class="img-fluid round-start">
            </div>
            <div class="col-8">
                <div class="card-body">
                    <h5 class="card-title">${album.title}</h5>
                    <p class="card-text">${album.description}</p>
                    <p class="card-text"><small class="text-muted">Сборник выпущен в ${album.year} году</small></p>
                </div>
            </div>
        </div>
    </div>
    `;

    let playlist = document.querySelector(`.playlist`);

    let tracks = album.tracks;
    for (let j = 0; j < tracks.length; j++) {
        let track = tracks[j];
        playlist.innerHTML += `
        <li class="track list-group-item d-flex align-items-center">
            <img src="assets/play.svg" alt="" class="img-pause me-3" height="30px">
            <img src="assets/music.svg" alt="" class="img-play me-3 d-none css-selector" height="30px">
            <div>
                <div>${track.title}</div>
                <div class="text-secondary">${track.author}</div>
            </div>
            <div class="progress" role="progressbar" aria-label="Example with label" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                <div class="progress-bar" style="width: 25%">100%</div>
            </div>
            <div class="time ms-auto">
                <img src="assets/multimedia_play.svg" alt="" class="me-3" height="30px">${track.time}
            </div>
            <audio class="audio" src="${track.src}"></audio>
        </li>
        `;
    }
    function setupAudio() {
        // Найди коллекцию с треками
        let trackNodes = document.querySelectorAll(`.track`); 
        let tracks = album.tracks;
        for (let i = 0; i < trackNodes.length; i++) { 
            // Один элемент
            let node = trackNodes[i];
            let timeNode = node.querySelector(`.time`);
            // Тег аудио внутри этого элемента
            let audio = node.querySelector(`.audio`);
            let track = tracks[i];
            // продолжи самостоятельно
            let imgPause = node.querySelector(`.img-pause`);
            let imgPlay = node.querySelector(`.img-play`);

            node.addEventListener(`click`, function () {
                // Если трек сейчас играет...
                if (track.isPlaying) {
                    track.isPlaying = false;
                    // Поставить на паузу
                    audio.pause();
                    imgPause.classList.remove(`d-none`);
                    imgPlay.classList.add(`d-none`);
                // Если трек сейчас не играет...
                } else {
                    track.isPlaying = true;
                    // Включить проигрывание
                    audio.play();
                    imgPause.classList.add(`d-none`);
                    imgPlay.classList.remove(`d-none`);
                    updateProgress();
                }
            });

            function updateProgress() {
                // Нарисовать актуальное время
                let time = getTime(audio.currentTime);
                if (time != getTime(audio.currentTime)) {
                    timeNode.innerHTML = getTime(audio.currentTime);
                }
                // Нужно ли вызвать её ещё раз?
                if (track.isPlaying) {
                    requestAnimationFrame(updateProgress);
                }
              }
        }
    }

    setupAudio();

    function getTime(time) {
        let currentSeconds = Math.floor(time);
        let minutes = Math.floor(currentSeconds / 60);
        let seconds = Math.floor(currentSeconds % 60);
        if (minutes < 10) {
            minutes = `0` + minutes;
        }
        if (seconds < 10) {
            seconds = `0` + seconds;
        }
        return `${minutes}:${seconds}`;
    }
}