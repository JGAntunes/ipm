
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

    var nomeUser ="<p>Sizenante Fonseca</p>"
    var data = "<p>24/03/2230</p>"
    var otherUser = "<p>Gilberto Fradique</p><p>XX-KK-00</p>"
    var avisoTxt = "<p>Cuidado! Acabei de passar por uma operação stop.</p>"
    var conviteTxt = "<p>Olá, não pude deixar de reparar em ti. Queres ir beber um café logo?</p>"
    var criticaTxt = "<p>Não aceleres tanto nesta estrada.</p>"
    var piropoTxt = "<p>Epah, pareces um helicóptero... Gira e boa!</p>"
    var insultoTxt = "<p>Sai da frente oh palhaço!</p>"

    $("#msg").on("changeAct", function(){
        tittleChanger("Mensagens", "Enviar e ver mensagens recebidas de outros utilizadores", "");
    });

    $("#camara").on("changeAct", function(){
        tittleChanger("Câmaras", "Ver, tirar fotos e muito mais usando as câmaras dos passageiros", "");
    });

    $("#persona").on("changeAct", function(){
        tittleChanger("Personalização/ Avarias", "Personalizar o seu carro e verificar as avarias registadas", "");
    });

    $("#caixa").on("changeAct", function(){
        tittleChanger("Caixa de entrada", "Ver e responder a mensagens recebidas", "");
    });

    $("#enviar").on("changeAct", function(){
        tittleChanger("Enviar mensagem", "Enviar uma mensagem para um utilizador", "");
    });

    $("#home").on("changeAct", function(){
        tittleChanger("Menu principal", "Voltar ao menu principal", "");
    });

    $("#aviso").on("changeAct", function(){
        tittleChanger("Avisos", "Mensagens de aviso relacionadas com a condução", "<h4> Exemplos: </h4>" + avisoTxt);
    });
    $("#convite").on("changeAct", function(){
        tittleChanger("Convites", "Convites para sair ou outras actividades", "<h4> Exemplos: </h4>" + conviteTxt);
    });

    $("#critica").on("changeAct", function(){
        tittleChanger("Críticas", "Criticas boas/más relaccionadas com a condução alheia", "<h4> Exemplos: </h4>" + criticaTxt);
    });

    $("#piropo").on("changeAct", function(){
        tittleChanger("Piropos", "Piropos diversificados e que, com sorte, terão impacto certo!", "<h4> Exemplos: </h4>" + piropoTxt);
    });

    $("#insulto").on("changeAct", function(){
        tittleChanger("Insultos", "Insultos diversificados que farão qualquer condutor pensar 2 vezes ao olhar para si novamente", "<h4> Exemplos: </h4>" + insultoTxt);
    });

    $("#aviso1").on("changeAct", function(){
        tittleChanger("1 / 1", "Mensagem pré-definida de aviso - 1", "<h4> Mensagem: </h4>" + avisoTxt + nomeUser + data);
    });
    $("#convite1").on("changeAct", function(){
        tittleChanger("1 / 1", "Mensagem pré-definida de convite - 1", "<h4> Mensagem: </h4>" + conviteTxt + nomeUser + data);
    });

    $("#critica1").on("changeAct", function(){
        tittleChanger("1 / 1", "Mensagem pré-definida de critica - 1", "<h4> Mensagem: </h4>" + criticaTxt + nomeUser + data);
    });

    $("#piropo1").on("changeAct", function(){
        tittleChanger("1 / 1", "Mensagem pré-definida de piropo - 1", "<h4> Mensagem: </h4>" + piropoTxt + nomeUser + data);
    });

    $("#insulto1").on("changeAct", function(){
        tittleChanger("1 / 1", "Mensagem pré-definida de insulto - 1", "<h4> Mensagem: </h4>" + insultoTxt + nomeUser + data);
    });

    $("#user1").on("changeAct", function(){
        tittleChanger("1 / 1", "Utilizador Seleccionado - 1", "<h4> Utilizador: </h4>" + otherUser);
    });

    var listener = new window.keypress.Listener();
    var $act = $(".nav-button:first");
    var $actside = $(".side:first");
    var $prev = "index.html"
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

    listener.simple_combo("right", function() {
        if(document.URL.match(/[^\/]+$/)[0] == "agree.html"){
            tittleChanger("Enviada", "Mensagem enviada com sucesso!", "");
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
        if(document.URL.match(/[^\/]+$/)[0] != "index.html"){
            window.history.back();
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