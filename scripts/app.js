(function($){
    $.fn.canvasify = function(f){ // faster than dynamically converting a pixel at a time?
        return this.map(function(){
            if (this.nodeName=="IMG"){
                var canvas=$('<canvas>');
                this.src = this.src // IE fix
                $(this).one('load',function(){
                    canvas.attr({width:this.width,height:this.height});
                    canvas[0].getContext('2d').drawImage(this,0,0,this.width,this.height);
                    $(this).replaceWith(canvas)
                })
                return canvas[0]
            }else{
                return this
            }
        })
    }
    function Rgba(rgba){
        this.rgba = rgba
        this.toString = function(){ return "rgba("+Array.prototype.join.call(this.rgba,',')+")" };
    }
    $.Event.prototype.rgba=function(){
        var x =  parseInt($('#app-picker').offset().left - $(this.target).offset().left),
            y =  parseInt($('#app-picker').offset().top - $(this.target).offset().top),
            nodeName = this.target.nodeName;
        /*var x =  $('#app-picker').offset().left || ($('#app-picker').pageX - $(this.target).offset().left), //was this.offsetX instead of $('#app-picker').offset().left
            y =  $('#app-picker').offset().top || ($('#app-picker').pageY - $(this.target).offset().top), //was this.offsetY*/
        /*var x =  this.offsetX || (this.pageX - $(this.target).offset().left),
            y =  this.offsetY || (this.pageY - $(this.target).offset().top),*/

        if (nodeName==="CANVAS")
            return new Rgba(this.target.getContext('2d').getImageData(x,y,1,1).data);
        else if (nodeName==="IMG"){
            var canvas=document.createElement("canvas");
            canvas.width=1;
            canvas.height=1;
            canvas.getContext('2d').drawImage(this.target,x,y,1,1,0,0,1,1);
            return new Rgba(canvas.getContext('2d').getImageData(0,0,1,1).data)
        } else return null
    }
})(jQuery);

$(function() {
    var imageOriginalHue = 52;
    var currentHue = 0;
    var newHue;

    $('#app').canvasify().mouseup(demo);
    //	$('img').click(demo)
    function demo(e){
        var rgba=e.rgba();
        var hsl = color2color(rgba.toString(), "hsl"); // Returns "hsl(109,100%,37%)"
        newHue = parseInt(hsl.substr(4, 3)) - imageOriginalHue;
        animateHue();
    }

    var animateHue = function(){
        if(newHue<0)
            currentHue--;
        else
            currentHue++;

        if(currentHue > 315 || currentHue <-imageOriginalHue)
            currentHue = 0;
        $('#app-img').css({
            "filter": "hue-rotate("+currentHue+"deg)",
            "-webkit-filter" : "hue-rotate("+currentHue+"deg)",
            "-moz-filter" : "hue-rotate("+currentHue+"deg)",
            "-o-filter" : "hue-rotate("+currentHue+"deg)",
            "-ms-filter" : "hue-rotate("+currentHue+"deg)"
        });
        if(currentHue!=newHue)
            setTimeout(animateHue, 5);
        /*console.log("Current Hue:"+currentHue);
        console.log("New Hue:"+newHue);*/
    }
});

//rotating picker
function rotateAnnotationCropper(offsetSelector, xCoordinate, yCoordinate, cropper, removeListener){
    var x = xCoordinate - offsetSelector.offset().left - offsetSelector.width()/2;
    var y = -1*(yCoordinate - offsetSelector.offset().top - offsetSelector.height()/2);
    var theta = Math.atan2(y,x)*(180/Math.PI);


    var cssDegs = convertThetaToCssDegs(theta);
    var rotate = 'rotate(' +cssDegs + 'deg)';
    cropper.css({'-moz-transform': rotate, 'transform' : rotate, '-webkit-transform': rotate, '-ms-transform': rotate});
    if(removeListener == true)
        $('body').on('mouseup', function(event){ $('body').unbind('mousemove')});

}

function convertThetaToCssDegs(theta){
    var cssDegs = 90 - theta;
    return cssDegs;
}

$(function() {
    $('#app-picker').on('mousedown', function(){
        $('body').on('mousemove', function(event){
            rotateAnnotationCropper($('#app-container'), event.pageX,event.pageY, $('#app-picker'), true);
        });
    });
    $('#app-container').on('mousedown', function(event){
        rotateAnnotationCropper($('#app-container'), event.pageX,event.pageY, $('#app-picker'), false);
    });
});