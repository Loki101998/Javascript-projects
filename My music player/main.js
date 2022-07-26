let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let sound_class = document.querySelector(".sound-class");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create new audio element
let curr_track = document.createElement("audio");

// Define the tracks that have to be played
let track_list = [
  {
    name: "Kesariya",
    artist: "Arijit Singh",
    image:
      "https://snoidcdnems04.cdnsrv.jio.com/c.saavncdn.com/191/Kesariya-From-Brahmastra-Hindi-2022-20220717092820-500x500.jpg",
    path: "https://pagalworld.com.se/files/download/id/6591",
  },
  {
    name: "Chaand Baaliyan",
    artist: "Aditya A",
    image: "https://i.ytimg.com/vi/Xi8Fabcb_MA/maxresdefault.jpg",
    path: "https://pagalworld.com.se/files/download/id/5554",
  },
  {
    name: "Sage",
    artist: "Ritviz",
    image: "https://i.ytimg.com/vi/_kUrW9SEaJc/maxresdefault.jpg",
    path: "https://paglasongs.com/files/download/id/779",
  },
  {
    name: "Let me down slowly",
    artist: "Alec Benjamin",
    image: "https://i.ytimg.com/vi/50VNCymT-Cs/maxresdefault.jpg",
    path: "https://pagalworld.com.se/files/download/id/5637",
  },
];

function random_bg_color() {
  // Get a number between 64 to 256 (for getting lighter colors)
  let red = Math.floor(Math.random() * 256) + 64;
  let green = Math.floor(Math.random() * 256) + 64;
  let blue = Math.floor(Math.random() * 256) + 64;
  let bgColor = `rgb(${red},${green},${blue})`;
  document.body.style.background = bgColor;
}

function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();
  curr_track.src = track_list[track_index].path;
  curr_track.load();

  track_art.style.backgroundImage = `url(${track_list[track_index].image})`;
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;

  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
  random_bg_color();
}

function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

// Load the first track in the tracklist
loadTrack(track_index);

function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="lni lni-pause"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="lni lni-play"></i>';
}

function nextTrack() {
  if (track_index < track_list.length - 1) track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0) track_index -= 1;
  else track_index = track_list.length;
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
  console.log(curr_track.volume);
  if (curr_track.volume === 0.01) {
    sound_class.innerHTML = '<i class="lni lni-volume-mute"></i>';
    console.log(sound_class);
  } else if (curr_track.volume > 0.01 && curr_track.volume <= 0.3) {
    sound_class.innerHTML = '<i class="lni lni-volume-low"></i>';
    console.log(sound_class);
  } else if (curr_track.volume > 0.3 && curr_track.volume <= 0.8) {
    sound_class.innerHTML = '<i class="lni lni-volume-medium"></i>';
    console.log(sound_class);
  } else {
    sound_class.innerHTML = '<i class="lni lni-volume-high"></i>';
    console.log(sound_class);
  }
}

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);

    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(
      curr_track.currentTime - currentMinutes * 60
    );
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(
      curr_track.duration - durationMinutes * 60
    );

    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    if (currentMinutes < 10) {
      currentMinutes = "0" + currentMinutes;
    }
    if (durationMinutes < 10) {
      durationMinutes = "0" + durationMinutes;
    }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}
