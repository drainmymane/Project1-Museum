$(document).ready(function(){
  $('.video-slider').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: true,
    asNavFor:".big-video",
    prevArrow:'<button type="button" class="slick-prev">&#171</button>',
    nextArrow:'<button type="button" class="slick-next">&#187</button>',
    appendArrows:$('div.controls'),
    appendDots:$('div.controls-list')
  });
  $('.big-video').slick({
    arrows: false,
    fade: true,
    asNavFor:".video-slider"
  });
});