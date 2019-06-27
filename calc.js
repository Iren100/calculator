const CALC_DISPLAY = document.Calculator.display;

const MAP_ACTIONS = new Map();
MAP_ACTIONS.set('C',  ()=> {Clear()  ;});  
MAP_ACTIONS.set('=',  ()=> {DelNull();});
MAP_ACTIONS.set('CE', ()=> {Value()  ;});
MAP_ACTIONS.set('.',  ()=> {CALC_DISPLAY.value += ".";
							Valid();
							Str();});
MAP_ACTIONS.set('Actions', (a)=>{CALC_DISPLAY.value += a;
								Valid();
								Str();});
MAP_ACTIONS.set('Numbers', (a)=>{CALC_DISPLAY.value += a;
								DNull(a);
								Str();});

function Actions(a, type){	
	if (MAP_ACTIONS.has(a))
		return MAP_ACTIONS.get(a);
	else if (MAP_ACTIONS.has(type))
			return MAP_ACTIONS.get(type);	  
}

function Clear(){
	CALC_DISPLAY.value = "";
}

function Value() {
    CALC_DISPLAY.value = 
		CALC_DISPLAY.value.substring(0, CALC_DISPLAY.value.length - 1);
}

function Valid(){
	const ARR = [".","-","+","*","/"];
	let el1 = CALC_DISPLAY.value.charAt(CALC_DISPLAY.value.length - 2);
	let pos = ARR.indexOf(el1);
	let el2 = CALC_DISPLAY.value.charAt(CALC_DISPLAY.value.length - 1);
	let pos2 = ARR.indexOf(el2);
	if ((pos != -1)&&(pos2 != -1))
		Value();
}

function DelNull(){
	let el1 = CALC_DISPLAY.value.charAt(CALC_DISPLAY.value.length-1);
	let el2 = CALC_DISPLAY.value.charAt(CALC_DISPLAY.value.length-2);
	if ((el1 === "0") && (el2 ==="/"))
		{Value();
		alert("division by zero!")}
	else
		{CALC_DISPLAY.value =  eval(CALC_DISPLAY.value);
		Str();
		CALC_DISPLAY.value =  Fix(CALC_DISPLAY.value)}
}

Str = (l = 15) => {
	if (CALC_DISPLAY.value.length > l)
		CALC_DISPLAY.value = CALC_DISPLAY.value.substring(0,l);
}

function DNull(){
	const ARR = ["","-","+","*","/"];
	let el0 = CALC_DISPLAY.value.charAt(CALC_DISPLAY.value.length - 1);
	if (el0 != 0) return;
	let el1 = CALC_DISPLAY.value.charAt(CALC_DISPLAY.value.length - 3);
	let el2 = CALC_DISPLAY.value.charAt(CALC_DISPLAY.value.length - 2);
	if  ((ARR.indexOf(el1) != -1) && (el2 ==="0"))
		CALC_DISPLAY.value = 
			CALC_DISPLAY.value.substring(0, CALC_DISPLAY.value.length - 1);
}

function TimeOut(){
	const NO_ACTIVE_DELAY = 12; 
	let now_no_active = 0; 
	setInterval(() => {now_no_active++;}, 1000); 
	setInterval(() => {if (now_no_active >= NO_ACTIVE_DELAY) { 
							Clear();
							return;}}, 1000); 
	document.onmousemove = () => {now_no_active = 0;};
	document.onkeydown = () => {now_no_active = 0;};
}

function OnClicks(){
	CALC_DISPLAY.onkeypress = () => {
  		Str(14);
  		return (event.keyCode>39)&&(event.keyCode<58)&&(event.keyCode!=44);
	}
	CALC_DISPLAY.oninput = () => {
		DNull();
  		Valid();
	}
  	for (let elem of document.getElementsByTagName("input")){ 
		let str = elem.getAttribute("value"); 
		if (elem.getAttribute("type") === "button")
		if (!isNaN(str))
			elem.addEventListener("click", ()=>Actions(str, "Numbers")(str));
		else
			elem.addEventListener("click", ()=>Actions(str, "Actions")(str));
  	}
}

function Fix(n){
	if (n.indexOf("9999999999") != -1)
		return parseFloat(n) + 0.0000000000001;
	return parseFloat(n);
}

OnClicks();
TimeOut();





