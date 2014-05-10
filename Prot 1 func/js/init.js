$(function(){
	sessionStorage.user = "Sizenante Fonseca";
	sessionStorage.performance = "<p><b>Performance:</b><br>Motor - <span id='motor'>Normal</span>;<br>Suspensão - <span id='suspension'>Normal</span>;</p>";
	sessionStorage.confort = "<p><b>Conforto:</b><br>Assentos - <span id='seat-number'>4/8</span>, <span id='seat-fabric'>Sintécticos</span>;<br>Vidros - <span id='glass-transparency'>Transparência normal</span>, <span id='glass-color'>Incolor</span>;</p>";
	sessionStorage.parts = sessionStorage.performance + "<br>" + sessionStorage.confort;
	sessionStorage.personaAlt = new Boolean();
	sessionStorage.help = new Boolean();
	console.log(sessionStorage.getItem("parts"));
	sessionStorage.predefperformance = sessionStorage.performance;
	sessionStorage.predefconfort = sessionStorage.confort;
	sessionStorage.predefparts = sessionStorage.parts;
});