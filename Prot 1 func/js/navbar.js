
$(function(){
    var listener = new window.keypress.Listener();
    var $act = $(".nav-button:first");
    $act.parent().addClass("active");
    listener.simple_combo("up", function() {
        $act.parent().removeClass("active");
        if($act.parent().prev().children(".nav-button").eq(0).is(".nav-button")){
            $act.prev().addClass("active");
        }
        else{
            $act = $(".nav-button:last");
            $act.parent().addClass("active");
        }
    });

    listener.simple_combo("down", function() {
        $act.parent().removeClass("active");
        if($act.parent().next().children(".nav-button").eq(0).is(".nav-button")){
            $act.parent().next().addClass("active");
        }
        else{
            $act = $(".nav-button:first");
            $act.parent().addClass("active");
        }
    });
});

/*$(function(){
    //$(".nav-button:first").focus();
    $(".nav-button:first").parent().addClass("active");
    //$(document.activeElement.parent()).addClass("active");
});*/

/*$( document ).keydown(function(e){
    var $act = $(".active");
    $(".active").removeClass("active");
   if(e.keyCode == 40) { // down
        //$(this).parent().next().find(".nav-button").focus();
        if($act.next().children(".nav-button").eq(0).is(".nav-button")){
            $act.next().addClass("active");
        }
        else{
            $(".nav-button:first").parent().addClass("active");
        }
        return false; // stops the page from scrolling
    }
    if(e.keyCode == 38) { // up
        //$(this).parent().prev().find(".nav-button").focus();
        if($act.prev().children(".nav-button").eq(0).is(".nav-button")){
            $act.prev().addClass("active");
        }
        else{
            $(".nav-button:last").parent().addClass("active");
        }
        return false; // stops the page from scrolling
    }
    if(e.which == 13) { // enter
        alert("Do something");
    }
});*/