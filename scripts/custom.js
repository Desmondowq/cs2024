/**
 * Created by Desmond on 10/3/2015.
 */
function parallaxContainer(){
    var bodyWidth = $(window).width();
    if(bodyWidth < 450){
        bodyWidth = 450;
    }
    //if(bodyWidth <= 768){
    //    bodyWidth = 768;
    //}
    //var parallaxHeight = Math.round(bodyWidth * 0.5625);
    //console.log(parallaxHeight);
    //$('.parallax_field').css('height',parallaxHeight+"px");
    //if(parallaxHeight > 432){
    //$('.intro_video_context').css('top',(parallaxHeight/21.36)+'%');
    //}else{
    //    $('.intro_video_context').css('top','20%');
    //}
    //if($('#fit_in_video').length){
    //    $('#fit_in_video').css('height',(bodyWidth*0.55)*0.5625);
    //}
}
$(window).resize(function() {
    parallaxContainer();
});

/*http://stackoverflow.com/questions/19674315/how-to-stop-html5-video-from-playing-when-out-of-viewport*/
function playVideo($video, desiredPositionStart, currentPosition){
    var videoElem = $video[0];

    var videoTop = $video.offset().top;
    var videoBottom = videoTop + $video.height();

    var viewTop = $(window).scrollTop();
    var viewBottom = viewTop + $(window).height();

//play video when opacity is at desiredPosition and at least some of the video player is show
    var isViewable = currentPosition > desiredPositionStart && (videoTop < viewBottom && videoBottom > viewTop);
    if(isViewable) {
        if(videoElem.paused) {
            videoElem.play();
            console.log("play");
        }
    }
    else {
        if(!videoElem.paused) {
            videoElem.pause();
            videoElem.currentTime = 0;
            videoElem.load();
            console.log("pause");
        }
    }
}
