let now_playing = document.querySelector('.now-playing');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let wave = document.getElementById('wave');
let randomIcon = document.querySelector('.fa-random');
let audio_player = document.getElementById('audio-player');
let video_player = document.getElementById('video-player');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const music_list = [
    {
        video: 'https://github.com/mohitk-s/Vidooe/raw/main/5_6102458992091468165.mp4',
        name: 'MONTA RE',
        artist: 'Sapna Aswal, @_sapna_aswal05',
        music: 'https://github.com/mohitk-s/Song-sp/raw/main/AUD-20240717-WA0000.mp3'
    },
    {
        video: 'https://github.com/mohitk-s/videoss/raw/main/14secvideo.mp4',
        name: 'Dagabaaz Re',
        artist: 'Sapna Aswal',
        music: 'https://github.com/mohitk-s/Song-sp/raw/main/AUD-20240717-WA0001.mp3'
    },
    {
        video: 'https://github.com/mohitk-s/videoss/raw/main/19sec.mp4',
        name: 'Phir bhi tumko chaahunga',
        artist: 'Sapna Aswal',
        music: 'https://github.com/mohitk-s/Song-sp/raw/main/AUD-20240717-WA0002.mp3'
    },
    {
        video: 'https://github.com/mohitk-s/videoss/raw/main/20secvideo.mp4',
        name: 'Mera Mann',
        artist: 'Sapna Aswal',
        music: 'https://github.com/mohitk-s/Song-sp/raw/main/AUD-20240717-WA0003.mp3'
    },
    {
        video: 'https://github.com/mohitk-s/videoss/raw/main/17secvideo.mp4',
        name: 'Pehle Bhi Main',
        artist: 'Sapna Aswal',
        music: 'https://github.com/mohitk-s/Song-sp/raw/main/AUD-20240717-WA0004.mp3'
    }
];

loadTrack(track_index);

function loadTrack(track_index) {
    clearInterval(updateTimer);
    reset();

    video_player.src = music_list[track_index].video;
    video_player.load();
    video_player.play();

    // Mute the video
    video_player.muted = true;

    // Loop the video
    video_player.loop = true;

    audio_player.src = music_list[track_index].music;
    audio_player.load();

    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;

    now_playing.textContent = `PLAYING ${track_index + 1} OF ${music_list.length}`;

    updateTimer = setInterval(seekUpdate, 1000);

    audio_player.addEventListener('ended', nextTrack);
}

function reset() {
    curr_time.textContent = '00:00';
    total_duration.textContent = '00:00';
    seek_slider.value = 0;
}

function playpauseTrack() {
    if (!isPlaying) playTrack();
    else pauseTrack();
}

function playTrack() {
    audio_player.play();
    video_player.play(); // Start playing the video
    isPlaying = true;
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
    audio_player.pause();
    video_player.pause(); // Pause the video
    isPlaying = false;
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

function nextTrack() {
    track_index++;
    if (track_index >= music_list.length) track_index = 0;
    loadTrack(track_index);
    playTrack(); // Start playing the new track automatically
}

function prevTrack() {
    track_index--;
    if (track_index < 0) track_index = music_list.length - 1;
    loadTrack(track_index);
    playTrack(); // Start playing the new track automatically
}

function seekTo() {
    let seekto = audio_player.duration * (seek_slider.value / 100);
    audio_player.currentTime = seekto;
}

function setVolume() {
    audio_player.volume = volume_slider.value / 100;
}

function seekUpdate() {
    let seekPosition = 0;

    if (!isNaN(audio_player.duration)) {
        seekPosition = audio_player.currentTime * (100 / audio_player.duration);

        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(audio_player.currentTime / 60);
        let currentSeconds = Math.floor(audio_player.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(audio_player.duration / 60);
        let durationSeconds = Math.floor(audio_player.duration - durationMinutes * 60);

        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
        if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}

function randomTrack() {
    isRandom = !isRandom;
    randomIcon.classList.toggle('randomActive');
}

function repeatTrack() {
    audio_player.loop = !audio_player.loop;
}
