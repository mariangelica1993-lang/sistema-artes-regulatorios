function mostrar(panel){
document.querySelectorAll(".panel").forEach(p=>p.style.display="none");
document.getElementById(panel).style.display="block";
}

let productos = JSON.parse(localStorage.getItem("productos")) || [];

function guardarProducto(){

let nombre = document.getElementById("nombre").value;
let rs = document.getElementById("rs").value;
let expediente = document.getElementById("expediente").value;
let ean = document.getElementById("ean").value;
let fabricante = document.getElementById("fabricante").value;
let pais = document.getElementById("pais").value;

let archivo = document.getElementById("pdf").files[0];

if(!nombre){
alert("Ingrese nombre");
return;
}

let reader = new FileReader();

reader.onload = function(){

let producto = {
nombre,
rs,
expediente,
ean,
fabricante,
pais,
pdf: reader.result
};

productos.push(producto);

localStorage.setItem("productos", JSON.stringify(productos));

alert("Guardado");

actualizar();

};

if(archivo){
reader.readAsDataURL(archivo);
}else{
reader.onload();
}

}

function actualizar(){
mostrarProductos();
mostrarPrioridades();
}

function mostrarProductos(){

let html="";

productos.forEach((p,i)=>{

html+=`
<div style="border:1px solid #ccc;padding:10px;margin:10px">

<b>${p.nombre}</b><br>

RS: ${p.rs}<br>

<button onclick="verPDF(${i})">Ver Arte</button>

<button onclick="revisar(${i})">Revisión</button>

</div>
`;

});

document.getElementById("listaProductos").innerHTML=html;

}

function verPDF(i){

let pdf = productos[i].pdf;

let w = window.open("");
w.document.write(`<iframe src="${pdf}" width="100%" height="100%"></iframe>`);

}

function revisar(i){

let p = productos[i];

let errores=[];

if(!p.rs) errores.push("Falta RS");
if(!p.ean) errores.push("Falta EAN");
if(!p.fabricante) errores.push("Falta fabricante");
if(!p.pais) errores.push("Falta país");
if(!p.pdf) errores.push("Falta arte");

let html="";

if(errores.length==0){

html="<h3 style='color:green'>LISTO PARA DIGEMID</h3>";

}else{

html="<h3 style='color:red'>Errores</h3><ul>";

errores.forEach(e=>html+="<li>"+e+"</li>");

html+="</ul>";

}

document.getElementById("resultado").innerHTML=html;

mostrar("revision");

}

function mostrarPrioridades(){

let html="";

productos.forEach(p=>{

let prioridad="";

if(p.rs){
prioridad="🔴 URGENTE";
}else if(p.expediente){
prioridad="🟠 MEDIA";
}else{
prioridad="🟢 BAJA";
}

html+=`
<div style="border:1px solid #ccc;padding:10px;margin:10px">
<b>${p.nombre}</b> - ${prioridad}
</div>
`;

});

document.getElementById("listaPrioridades").innerHTML=html;

}

window.onload = function(){
actualizar();
mostrar("nuevo");
};
