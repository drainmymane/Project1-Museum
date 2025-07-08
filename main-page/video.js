$(document).ready(function(){
  $('.video-slider').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: true,
    // asNavFor:".big-video",
    prevArrow:'<button type="button" class="slick-prev">&#171</button>',
    nextArrow:'<button type="button" class="slick-next">&#187</button>',
    appendArrows:$('div.controls'),
    appendDots:$('div.controls-list'),
    draggable: false,
  });
  // $('.big-video').slick({
  //   arrows: false,
  //   fade: true,
  //   asNavFor:".video-slider"
  // });

  $('.video-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
    handleVideoSwitch(nextSlide);
    $('.video-slider').slick('setPosition');
  });
});

const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressFilled = player.querySelector('.progress-filled');
const toggle = player.querySelector('.toggle');
const fullscreen = player.querySelector('.fullscreen');
const range = player.querySelector('.volume');
const bigPlayButton = document.querySelector('.big-play-button');

function togglePlay(){
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

function updateButton(e){
  const icon = this.paused ? '▶︎' : '||';
  this.paused ? bigPlayButton.classList.remove('hidden') : bigPlayButton.classList.add('hidden');
  toggle.textContent = icon;
  console.log(video)
}

function handleRangeUpdate(){
  console.log(this.value);
  video.volume = this.value;
}

function handleProgress(){
  const percent = (video.currentTime / video.duration)*100;
  progressFilled.style.flexBasis = `${percent}%`;
}

function handleScrub(e){
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function openFullscreen() {
  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.webkitRequestFullscreen) { /* Safari */
    video.webkitRequestFullscreen();
  } else if (video.msRequestFullscreen) { /* IE11 */
    video.msRequestFullscreen();
  }
}

function handleVideoSwitch(nextslide){
  video.src = `/Project1-Museum/videos/video${nextslide}.mp4`;
  console.log("KAKASHKI")
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
range.addEventListener('input', function() {
  const value = this.value * 100;
  this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #B3B3B3 ${value}%, #B3B3B3 100%)`
});
let mousedown = false;
toggle.addEventListener('click', togglePlay);
range.addEventListener('change', handleRangeUpdate);
progress.addEventListener('click', handleScrub);
progress.addEventListener('mousemove', (e)=> mousedown && handleScrub(e));
window.addEventListener('mousedown',() => mousedown=true);
window.addEventListener('mouseup', () => mousedown=false);
fullscreen.addEventListener('click', openFullscreen);