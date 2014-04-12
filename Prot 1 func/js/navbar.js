
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
    $("#mainwindow").children(".width").eq(0).on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', 
    function() {
        $(this).html(txt);
        $(this).addClass("act").removeClass("noact");
    });
    $("#mainwindow").children(".width").eq(0).addClass("noact").removeClass("act");
    $("#headerfunc").addClass("noact").removeClass("act");
    $("#helperfunc").addClass("noact").removeClass("act");
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

    $(".left-menu").on("changeAct", function(){
        var msg, help, txt;
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
        else if($(this).hasClass("msgop")){
            msg = $(this).data('msg'), help = $(this).data('help'), txt = sessionStorage.msgAct;
        }
        else{
            msg = $(this).data('msg'), help = $(this).data('help'), txt = $(this).data('txt');
        }
        if($(this).hasClass("store")){
            sessionStorage.msgAct = txt;

        }
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
    var $act = $(".nav-button:first");
    var $actside = $(".side:first");

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
        clearTimeout(msgTimer);
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