const videoContainer = document.getElementById('jsVideoPlayer');

let videoPlayer;
let playBtn;
let volumeBtn;
let fullScreenBtn;
let currentTime;
let totalTime;

const PLAY_ICON = `<i class="fas fa-play"></i>`;
const PAUSE_ICON = `<i class="fas fa-pause"></i>`;
const VOLUME_MEDIUM = `<i class="fas fa-volume-down"></i>`;
const VOLUME_MUTED = `<i class="fas fa-volume-mute"></i>`;
const VOLUME_OFF = `<i class="fas fa-volume-off"></i>`;
const VOLUME_FULL = `<i class="fas fa-volume-up"></i>`;
const FULLSCREEN = `<i class="fas fa-expand"></i>`;
const FULLSCREEN_OUT = `<i class="fas fa-compress"></i>`;

const volumeMuteIcon = () => (volumeBtn.innerHTML = VOLUME_MUTED);
const volumeMediumIcon = () => (volumeBtn.innerHTML = VOLUME_MEDIUM);
const volumeFullIcon = () => (volumeBtn.innerHTML = VOLUME_FULL);
const volumeOffIcon = () => (volumeBtn.innerHTML = VOLUME_OFF);

const playerPlayIcon = () => (playBtn.innerHTML = PLAY_ICON);
const playerPauseIcon = () => (playBtn.innerHTML = PAUSE_ICON);

const fullscreenIcon = () => (fullScreenBtn.innerHTML = FULLSCREEN);
const outFullScreenIcon = () => (fullScreenBtn.innerHTML = FULLSCREEN_OUT);

// function handlePlayClick({
//     if (videoPlayer.paused){
//         videoPlayer.play();
//     } else {
//         videoPlayer.pause()
//     }
// })

const handlePlayClick = () => {
  if (videoPlayer.paused) {
    // readonly - 불리언값 줌
    videoPlayer.play();
    playerPauseIcon();
  } else {
    videoPlayer.pause();
    playerPlayIcon();
  }
};

const handleVolumeClick = () => {
  if (videoPlayer.muted) {
    // 이건 readonly 아님 - 불리언값 줌
    videoPlayer.muted = false;
    volumeMediumIcon();
  } else {
    videoPlayer.muted = true;
    volumeMuteIcon();
  }
};

const enterFullScreen = () => {
  // 그냥 함수는 지원 안 해서 webkit(크롬엔진) 쓰라고 되어 있음
  // 익스플로러는 ms / 모질라는 moz
  if (videoContainer.requestFullscreen) {
    videoContainer.requestFullscreen();
  } else if (videoContainer.mozRequestFullscreen) {
    videoContainer.mozRequestFullScreen();
  } else if (videoContainer.webkitRequestFullScreen) {
    videoContainer.webkitRequestFullscreen();
  } else if (videoContainer.msRequestFullscreen) {
    videoContainer.msRequestFullscreen();
  }
  outFullScreenIcon();
  fullScreenBtn.removeEventListener('click', enterFullScreen); // 이벤트 리스너 삭제
  fullScreenBtn.addEventListener('click', exitFullScreen); // 이벤트 리스너 추가
};

const exitFullScreen = () => {
  fullscreenIcon();
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
  fullScreenBtn.removeEventListener('click', exitFullScreen);
  fullScreenBtn.addEventListener('click', enterFullScreen);
};

const formatData = seconds => {
  const secondsNumber = parseInt(seconds, 10); // don't forget the second param
  let hours = Math.floor(secondsNumber / 3600);
  let minutes = Math.floor((secondsNumber - hours * 3600) / 60);
  let totalSeconds = secondsNumber - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (seconds < 10) {
    totalSeconds = `0${totalSeconds}`;
  }
  return `${hours}:${minutes}:${totalSeconds}`;
};

const setCurrentTime = () => {
  currentTime.innerHTML = formatData(Math.floor(videoPlayer.currentTime));
};

const setTotalTime = () => {
  const totalTimeString = formatData(videoPlayer.duration);

  // Issue: getBlobDuration 안 된다.search_videos
  // ISSUE: getBlobDuration 안된다
  // console.log('Sadfasdfasdf');
  // const videoBlob = await fetch(videoPlayer.src).then(response => response.blob());
  // videoBlob.type = 'video/mp4';
  // console.log(videoBlob);
  // const duration = await getBlobDuration(videoBlob);
  // console.log('duration', duration);
  // const totalTimeString = formatDate(duration);
  // console.log('totalTimeString', duration);

  totalTime.innerHTML = totalTimeString;
  setInterval(setCurrentTime, 1000);
};

const handleEnded = () => {
  videoPlayer.currentTime = 0;
  playerPlayIcon();
};

const initVideoPlayer = () => {
  videoPlayer = videoContainer.querySelector('#jsVideoPlayer video');
  playBtn = videoContainer.querySelector('#jsPlayButton');
  volumeBtn = videoContainer.querySelector('#jsVolumeButton');
  fullScreenBtn = videoContainer.querySelector('#jsFullScreenButton');
  currentTime = videoContainer.querySelector('#jsCurrentTime');
  totalTime = videoContainer.querySelector('#jsTotalTime');
  viewString = document.querySelector('#jsViewString');

  playBtn.addEventListener('click', handlePlayClick);
  volumeBtn.addEventListener('click', handleVolumeClick);
  // 풀스크린 체크해주는 함수가 없어서 이벤트리스너를 바꾸는 방식으로 해야됨
  fullScreenBtn.addEventListener('click', enterFullScreen);
  // 비디오가 메타데이터를 로드할 때까지 기다려야함
  // 그냥 함수바로 쓰면 메타 데이터 로드 전이라서 계산이 안 돼서 Nan 뜸
  videoPlayer.onloadedmetadata = setTotalTime();
  //   videoPlayer.addEventListener('loadedmetadata', setTotalTime);
  videoPlayer.addEventListener('ended', handleEnded);
};

// js파일이 하상 모든 페이지 footer 아래 include되는 걸 명심!
// 이벤트리스너를 이용했을 때 해당 id 못찾으면 null이 돼서 에러냄

if (videoContainer) {
  initVideoPlayer();
}
