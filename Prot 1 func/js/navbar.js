
function tittleChanger(msg) {
    $("#tittle").children().on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', 
    function() {
        $(this).html(msg);
        $(this).addClass("act").removeClass("noact");
    });
    $("#tittle").children().addClass("noact").removeClass("act");
}

$(function(){

    $("#msg").on("changeAct", function(){
        tittleChanger("Mensagens");
    });

    $("#camara").on("changeAct", function(){
        tittleChanger("Câmaras");
    });

    $("#persona").on("changeAct", function(){
        tittleChanger("Personalização/ Avarias");
    });

    var listener = new window.keypress.Listener();
    var $act = $(".nav-button:first");
    var $actside = $(".side:first");
    $act.parent().addClass("active");
    $actside.parent().addClass("act").removeClass("noact");

    listener.simple_combo("up", function() {
        $act.parent().removeClass("active");
        $actside.parent().addClass("noact").removeClass("act");
        $act = $act.parent().prev().children(".nav-button").eq(0);
        if($act.is(".nav-button")){
            $actside = $actside.parent().prev().children(".side").eq(0);
        }
        else{
            $act = $(".nav-button:last");
            $actside = $(".side:last");
        }
        $act.parent().addClass("active").trigger("changeAct");
        $actside.parent().addClass("act").removeClass("noact");
    });

    listener.simple_combo("down", function() {
        $act.parent().removeClass("active");
        $actside.parent().addClass("noact").removeClass("act");
        $act = $act.parent().next().children(".nav-button").eq(0);
        if($act.is(".nav-button")){
            $actside = $actside.parent().next().children(".side").eq(0);
        }
        else{
            $act = $(".nav-button:first");
            $actside = $(".side:first");
        }
        $act.parent().addClass("active").trigger("changeAct");
        $actside.parent().addClass("act").removeClass("noact");
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