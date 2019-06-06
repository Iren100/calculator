function Numbers(a){
	DNull(a);
	document.Calculator.display.value += a;
	Str();
}

function Actions(a){
	document.Calculator.display.value += a;
	Valid();
	Str();
}

function Clear(){
	document.Calculator.display.value = "";
}

function CE(){
	document.Calculator.display.value = 
			document.Calculator.display.value.substring(0, document.Calculator.display.value.length - 1);
}

function Valid(){
	var arr = ["-","+","*","/"];
	var el = document.Calculator.display.value.charAt(document.Calculator.display.value.length-2);
	var pos = arr.indexOf(el);
	if (pos != -1)
		document.Calculator.display.value = 
			document.Calculator.display.value.substring(0, document.Calculator.display.value.length - 1);
}

function DelNull(){
	var el1 = document.Calculator.display.value.charAt(document.Calculator.display.value.length-1);
	var el2 = document.Calculator.display.value.charAt(document.Calculator.display.value.length-2);
	if ((el1 === "0") && (el2 ==="/"))
		{document.Calculator.display.value = 
			document.Calculator.display.value.substring(0, document.Calculator.display.value.length - 1);
			alert("division by zero!")}
	else
	{
		document.Calculator.display.value = eval(document.Calculator.display.value);
		Str();
	}
}

function Str(){
	var len = document.Calculator.display.value.length;
	if (len > 15)
		document.Calculator.display.value = document.Calculator.display.value.substring(0,15);
}

function DNull(a){
	var arr = ["","-","+","*","/"];
	var el1 = document.Calculator.display.value.charAt(document.Calculator.display.value.length-2);
	var pos = arr.indexOf(el1);
	var el2 = document.Calculator.display.value.charAt(document.Calculator.display.value.length-1);
	if  ((pos != -1) && (el2 ==="0"))
		document.Calculator.display.value = 
			document.Calculator.display.value.substring(0, document.Calculator.display.value.length - 1);	
}

function TimeOut(){
	var no_active_delay = 12; 
	var now_no_active = 0; 
	setInterval(function() {now_no_active++;}, 1000); 
	setInterval(function() {if (now_no_active >= no_active_delay) { 
							Clear();
							return;}}, 1000); 
	document.onmousemove = function() {now_no_active = 0;};
}



