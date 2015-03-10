/**
 * Created by Desmond on 10/3/2015.
 */
function parallaxContainer(){
    var bodyWidth = $(window).width();
    if(bodyWidth <= 768){
        bodyWidth = 768;
    }
    var parallaxHeight = Math.round(bodyWidth * 0.5625);
    //console.log(parallaxHeight);
    //$('.parallax_field').css('height',parallaxHeight+"px");
    //if(parallaxHeight > 432){
    //$('.intro_video_context').css('top',(parallaxHeight/21.36)+'%');
    //}else{
    //    $('.intro_video_context').css('top','20%');
    //}
}
$(window).resize(function() {
    parallaxContainer();
});