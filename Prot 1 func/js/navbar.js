
function tittleChanger(msg, help, txt) {
    $("#headerfunc").on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', 
    function() {
        $(this).html(msg);
        $(this).addClass("act").removeClass("noact");
    });
    $("#helperfunc").on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', 
    function() {
        $(this).html(help);
        $(this).addClass("act").removeClass("noact");
    });
    $("#maintext").on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', 
    function() {
        $(this).html(txt);
        $(this).addClass("act").removeClass("noact");
    });
    $("#maintext").addClass("noact").removeClass("act");
    $("#headerfunc").addClass("noact").removeClass("act");
    $("#helperfunc").addClass("noact").removeClass("act");
}

function scroller($act, $fixedPos, $movingPos, id){

    var otherId;
    var arrow;

    if(id === "top-elem"){
        otherId = "bottom-elem";
        arrow = "bottom-arrow";
    }
    else{
        otherId = "top-elem";
        arrow = "top-arrow";
    }

    console.log("Bottom reached, start scroll");

    if(!($fixedPos.length)){
        console.log($fixedPos);
        $("#"+arrow).css("visibility", "visible");
        if(id === "top-elem"){
            $fixedPos = $(".nav-button").last();
        }
        else{
            $fixedPos = $(".nav-button").first();
        }
    }
    else{
        $("#"+otherId).removeAttr("id");
    }
    $fixedPos.attr("id", otherId);
    $fixedPos.parent().animate({
        opacity : "0"},
        30, function(){
            $fixedPos.parent().animate({height: "0"}, 45, null);
        });
    $act.parent().animate({
        height  : "60px"},
        30, function() {
            $act.parent().animate({opacity : "1"}, 45, null);
            $act.removeAttr('id');
            if($movingPos.is(".nav-button")){
                $movingPos.attr("id",id);
            }
            console.log($fixedPos);
    });
}

$(function(){

/*    var nomeUser ="<p>Sizenante Fonseca</p>"
    var data = "<p>24/03/2230</p>"
    var otherUser = "<p>Gilberto Fradique</p><p>XX-KK-00</p>"
    var avisoTxt = "<p>Cuidado! Acabei de passar por uma operação stop.</p>"
    var conviteTxt = "<p>Olá, não pude deixar de reparar em ti. Queres ir beber um café logo?</p>"
    var criticaTxt = "<p>Não aceleres tanto nesta estrada.</p>"
    var piropoTxt = "<p>Epah, pareces um helicóptero... Gira e boa!</p>"
    var insultoTxt = "<p>Sai da frente oh palhaço!</p>"*/
    var msgTimer;
    sessionStorage.user = "Sizenante Fonseca";
    sessionStorage.parts = "<p>Performance:<br>Motor - <span id='motor'>normal</span>;<br>Suspensão - <span id='suspension'>normal</span>;</p><br><p>Conforto:<br>Assentos - <span id='seat-number'>4</span>, <span id='seat-fabric'>sintécticos</span>;<br>Vidros - <span id='glass-transparency'>transparência normal</span>, <span id='glass-color'>incolor</span>;</p>";
    console.log(sessionStorage.getItem("parts"));
    sessionStorage.predefparts = sessionStorage.parts;

    if($(".progress-bar") !== undefined){
        $(".progress-bar").animate({ width: "100%" }, {duration: 5000, complete: function() {
            setTimeout(function(){
                $(".on-complete").css("visibility", "visible");
                $("#user").css({opacity: 1.0}).animate({opacity: 0}, 150).css({visibility: "hidden"});
                $("#user").empty().addClass("usermain").animate({opacity: 1.0, visibility: "visible"}, 150);
                tittleChanger(null, "Bem-vindo " + sessionStorage.user + "!", null);
            }, 1000);
            setTimeout(function (){
                window.open("index.html", "_self");
                window.location.replace("index.html");
            }, 5000);
        }} );
    }


    $(".left-menu").on("changeAct", function(){
        var msg, help, txt, otherTxt;
        if($(this).hasClass("msgli")){
            if($(this).hasClass("read")){
                msg = "lida";
            }
            else{
                msg = "nova";
            }
            msg = 'Mensagem ' + msg;
            help = $("li.unread").length + ' mensagens novas, ' + $("li.read").length + ' mensagens lidas';
            txt = $(this).data('txt');
        }
        else if($(this).hasClass("usestore")){
            msg = $(this).data('msg'), help = $(this).data('help'), txt = sessionStorage.msgAct;
        }
        else if($(this).hasClass("usestore2")){
            msg = $(this).data('msg'), help = $(this).data('help'), txt = sessionStorage.otherTxt;
        }
        else if($(this).hasClass("usestore3")){
            msg = $(this).data('msg'), help = $(this).data('help'), txt = sessionStorage.parts;
        }
        else{
            msg = $(this).data('msg'), help = $(this).data('help'), txt = $(this).data('txt');
        }
        if($(this).hasClass("store")){
            otherTxt = $(this).data('txt2');
            sessionStorage.msgAct = txt;
            if(otherTxt != undefined){
                sessionStorage.otherTxt = otherTxt;
            } 
        }
        /*if($(this).hasClass("store2")){
            console.log($(this).data('txt'));
            console.log($(this).data('msg'));
            $("'"+$(this).data('txt')+"'").html($(this).data('msg'));
            msg = $(this).data('msg'), help = $(this).data('help'), txt = sessionStorage.parts = $('#maintext').html();
        }*/
        tittleChanger(msg, help, txt);
    });

    $(".unread").on("changeAct", function(){
        msgTimer = setTimeout(function(){
            $(".active a span").addClass('glyphicon-check').removeClass("glyphicon-align-justify");
            $(".active").addClass('read').removeClass("unread").trigger('changeAct');
            clearTimeout(msgTimer);
        },5000);
    });



    var listener = new window.keypress.Listener();
    var $nextAct;
    var $act = $(".nav-button:first");
    var $actside = $(".side:first");
    var top = 0;

    if(document.URL.match(/[^\/]+$/)[0] == "agree.html"){
        setTimeout(function(){
            tittleChanger($(this).data('msg'), $(this).data('help'), sessionStorage.msgAct);
        },100);
    }

    $act.parent().addClass("active");
    setTimeout(function(){
        $act.parent().trigger('changeAct');        
    },100);

    $actside.parent().addClass("act").removeClass("noact");

    listener.simple_combo("up", function() {
        clearTimeout(msgTimer);
        $act.parent().removeClass("active");
        $actside.parent().addClass("noact").removeClass("act");
        $nextAct = $act.parent().prev().children(".nav-button").eq(0);

        if($nextAct.is("#top-elem")){
            $act = $nextAct;
            scroller($act, $("#bottom-elem").parent().prev().children(".nav-button").eq(0), $act.parent().prev().children(".nav-button").eq(0), "top-elem");
        }

        else if($nextAct.is(".nav-button")){
            $act = $nextAct;
            $actside = $actside.parent().prev().children(".side").eq(0);
        }
        else if(!($(".roll-scroll").length)){
            $act = $nextAct;
            $act = $(".nav-button:last");
            $actside = $(".side:last");
        }
        if(!($nextAct.parent().prev().children(".nav-button").eq(0).length)){
            $("#top-arrow").css("visibility", "hidden");
        }
        $act.parent().addClass("active").trigger("changeAct");
        $actside.parent().addClass("act").removeClass("noact");
    });

    listener.simple_combo("down", function() {
        clearTimeout(msgTimer);
        $act.parent().removeClass("active");
        $actside.parent().addClass("noact").removeClass("act");
        $nextAct = $act.parent().next().children(".nav-button").eq(0);

        if($nextAct.is("#bottom-elem")){
            $act = $nextAct;
            scroller($act, $("#top-elem").parent().next().children(".nav-button").eq(0), $act.parent().next().children(".nav-button").eq(0), "bottom-elem");
        }

        else if($nextAct.is(".nav-button")){
            $act = $nextAct;
            $actside = $actside.parent().next().children(".side").eq(0);
        }
        else if(!($(".roll-scroll").length)){
            $act = $nextAct;
            $act = $(".nav-button:first");
            $actside = $(".side:first");
        }
        console.log($("#bottom-elem"));
        if(!($nextAct.parent().next().children(".nav-button").eq(0).length)){
            $("#bottom-arrow").css("visibility", "hidden");
        }
        $act.parent().addClass("active").trigger("changeAct");
        $actside.parent().addClass("act").removeClass("noact");
    });

    listener.simple_combo("right", function() {
        clearTimeout(msgTimer);
        if(document.URL.match(/[^\/]+$/)[0] == "agree.html"){
            tittleChanger("Efectuado", "Operação efectuada com sucesso!", "");
            setTimeout(function(){
                window.open("mensagens.html", "_self");
                window.location.replace("index.html");
        }, 2000);
        }
        else{
            window.open($act.attr("href"), "_self");
        }
    });

    listener.simple_combo("left", function() {
        clearTimeout(msgTimer);
        if(document.URL.match(/[^\/]+$/)[0] != "index.html"){
            window.history.back();
        }
    });
});