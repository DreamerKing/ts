function hello(compiler: string) {
	return (`Hello from ${compiler}`);
}

function showHello(divName: string, namr: string){
	const el = document.getElementById(divName);
	el.innerText = hello(name);
}

showHello("greeting", "TYpescript");

//hello("Typescript");