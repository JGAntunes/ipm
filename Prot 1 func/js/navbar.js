
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
    txt = txt.replace(/'/g, "\"");
    console.log(txt);
    console.log($("#maintext").html());
    if($("#maintext").html() != txt){ $("#maintext").addClass("noact").removeClass("act")};
    console.log(msg);
    console.log($("#headerfunc").html());
    if($("#headerfunc").html() != msg){ $("#headerfunc").addClass("noact").removeClass("act")};
    console.log(help);
    console.log($("#helperfunc").html());
    if($("#helperfunc").html() != help){ $("#helperfunc").addClass("noact").removeClass("act")};
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

function done(URL){
    tittleChanger("Efectuado", "Operação efectuada com sucesso!", "");
    $(".nav").hide();
    $("#mainwindow").hide();
    setTimeout(function(){
        window.location.replace("index.html");
        window.open(URL, "_self");
    }, 2000);
}

function zoom(type){
    ratio = (parseFloat($(".img").css("height")) / parseFloat($(".img").css("width")));
    if(type === "in"){
        $(".img").css({ height: parseFloat($(".img").css("height")) + ratio*5 + "px", width: parseFloat($(".img").css("width")) + ratio*5 + "px"});
    }
    else{
        $(".img").css({ height: parseFloat($(".img").css("height")) - ratio*5 + "px", width: parseFloat($(".img").css("width")) - ratio*5 + "px"});
    }
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

    if(sessionStorage.help === "true"){
        $("#helper").removeClass('noheight');
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
        else if($(this).hasClass("usestore-persona")){
            if($(this).attr("id") === "factory"){
                msg = $(this).data('msg'), help = $(this).data('help'), txt = sessionStorage.msgAct = "<p><b>Definições de fábrica:</b><br></p>" + sessionStorage.predefparts;
            }
            else if(($(this).attr("id") === "pre") && sessionStorage.partsPrev !== undefined){
                msg = $(this).data('msg'), help = $(this).data('help'), txt = sessionStorage.msgAct = "<p><b>Definições anteriores:</b><br></p>" + sessionStorage.getItem(sessionStorage.areaPersona + "Prev");
            }
            else{
                msg = $(this).data('msg'), help = $(this).data('help'), txt = sessionStorage.msgAct = sessionStorage.getItem(sessionStorage.areaPersona);
            }
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
        else if($(this).hasClass("store-confirm")){
            sessionStorage.confirm = $(this).data('confirm');
        }
        else if($(this).hasClass("store-persona")){
            console.log(sessionStorage.areaPersona);
            var $persona  = $($.parseHTML("<div>" + sessionStorage.getItem(sessionStorage.areaPersona) + "</div>"));
            console.log(sessionStorage.getItem(sessionStorage.areaPersona));
            $persona.find($(this).data('txt')).html("<b>" + $(this).data('msg') + "</b>");
            console.log($persona.html());
            msg = $(this).data('msg'), help = $(this).data('help'), txt = $persona.html();
        }
        if( msg !== undefined && help !== undefined && txt !== undefined){
            tittleChanger(msg, help, txt);
        }
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
            tittleChanger(sessionStorage.confirm, $(this).data('help'), sessionStorage.msgAct);
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
            console.log($(".active").attr("id"));
            console.log(window.history[0]);
            if($(".active").attr("id") === "sim"){
                console.log(sessionStorage.confirm);
                if(sessionStorage.confirm === "Sair sem guardar?" || sessionStorage.confirm === "Descartar alterações?"){
                    //tittleChanger("Efectuado", "Operação efectuada com sucesso!", "");
                    //$(".nav").hide();
                    //$("#mainwindow").hide();
                    //setTimeout(function(){
                    sessionStorage.parts = sessionStorage.partsPrev;
                    sessionStorage.performance = sessionStorage.performancePrev;
                    sessionStorage.confort = sessionStorage.confortPrev;
                    sessionStorage.personaAlt = "false";
                    done("avpersona.html");
                    //}, 2000);
                }
                else if(sessionStorage.confirm === "Restaurar definições de fábrica?"){
                    //tittleChanger("Efectuado", "Operação efectuada com sucesso!", "");
                    //$(".nav").hide();
                    //$("#mainwindow").hide();
                    //setTimeout(function(){
                    sessionStorage.performance = sessionStorage.performancePrev = sessionStorage.predefperformance;
                    sessionStorage.confort = sessionStorage.confortPrev = sessionStorage.predefconfort;
                    sessionStorage.parts = sessionStorage.partsPrev = sessionStorage.predefparts;
                    sessionStorage.personaAlt = "false";
                    done("avpersona.html");
                    //}, 2000);
                }
                else if(sessionStorage.confirm === "Guardar alterações?"){
                    //tittleChanger("Efectuado", "Operação efectuada com sucesso!", "");
                    //$(".nav").hide();
                    //$("#mainwindow").hide();
                    //setTimeout(function(){
                    var $aux = $($.parseHTML("<div>" + sessionStorage.performance + "</div>"));
                    $aux.find("span").find("b").contents().unwrap();
                    sessionStorage.performance = sessionStorage.performancePrev = $aux.html();
                    $aux = $($.parseHTML("<div>" + sessionStorage.confort + "</div>"));
                    $aux.find("span").find("b").contents().unwrap();
                    sessionStorage.confort = sessionStorage.confortPrev = $aux.html();
                    $aux = $($.parseHTML("<div>" + sessionStorage.parts + "</div>"));
                    $aux.find("span").find("b").contents().unwrap();
                    sessionStorage.parts = sessionStorage.partsPrev = $aux.html();
                    sessionStorage.personaAlt = "false";
                    done("avpersona.html");
                    //}, 2000);
                }
                else if(sessionStorage.confirm === "Sair do Kitt?"){
                    done("login.html");
                }
                else{
                    done("index.html");
                }
            }
            else{
                window.history.back();
            }
        }
        else if(document.URL.match(/[^\/]+$/)[0] == "video.html"){
            var video = document.getElementById("video");
            if($(".active").attr("id") === "play"){
                $(".glyphicon-play").addClass("glyphicon-pause").removeClass("glyphicon-play");
                $(".active").attr("id", "pause");
                //$("#video").css("opacity", "1");
                tittleChanger("Pausa","Parar o vídeo no momento em questão", sessionStorage.msgAct);
                video.play();
            }
            else if($(".active").attr("id") === "pause"){
                $(".glyphicon-pause").addClass("glyphicon-play").removeClass("glyphicon-pause");
                $(".active").attr("id", "play");
                $("#video").css("opacity", "0.6");
                tittleChanger("Reproduzir","Reproduzir o vídeo", sessionStorage.msgAct);
                video.pause();
            }
            else if($(".active").attr("id") === "stop"){
                $(".glyphicon-pause").addClass("glyphicon-play").removeClass("glyphicon-pause");
                $("#play").attr("id", "pause");
                $("#video").css("opacity", "0.6");
                video.pause();
                video.currentTime = 0;
            }
            else{
                window.open($act.attr("href"), "_self");
            }
        }
        else if($(".active").hasClass("persona")){
            if(sessionStorage.personaAlt == "false"){
                sessionStorage.personaAlt = "true";
                sessionStorage.partsPrev =  sessionStorage.parts;
                sessionStorage.performancePrev = sessionStorage.performance;
                sessionStorage.confortPrev = sessionStorage.confort;
            }
            sessionStorage.setItem(sessionStorage.areaPersona, $("#maintext").html());
            console.log(sessionStorage.getItem(sessionStorage.areaPersona));
            sessionStorage.parts = sessionStorage.performance + "<br>" + sessionStorage.confort;
            window.open("persona.html", "_self");
        }
        else if($(".active").attr("id") === "help"){
            if($("#helper").hasClass('noheight')){
                $("#helper").removeClass('noheight');
                
                sessionStorage.help = true;
            }
            else{
                $("#helper").addClass('noheight');
                sessionStorage.help = false;
            }
        }
        else if($(".active").attr("id") === "zoom-in"){
            zoom("in");
        }
        else if($(".active").attr("id") === "zoom-out"){
            zoom("out");
        }
        else{
            window.open($act.attr("href"), "_self");
        }
    });

    listener.simple_combo("left", function() {
        clearTimeout(msgTimer);
        console.log(sessionStorage.personaAlt);
        if(document.URL.match(/[^\/]+$/)[0] == "persona.html" && (sessionStorage.personaAlt == "true")){
            sessionStorage.confirm = "Sair sem guardar?";
            sessionStorage.msgAct = sessionStorage.parts;
            window.open("agree.html", "_self");
        }
        else if(document.URL.match(/[^\/]+$/)[0] != "index.html"){
            window.history.back();
        }
    });
});