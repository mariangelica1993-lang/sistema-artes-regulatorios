function mostrar(panel){

document.querySelectorAll(".panel").forEach(p=>{
p.style.display="none";
});

document.getElementById(panel).style.display="block";

}

let productos = JSON.parse(localStorage.getItem("productos")) || [];

function guardarProducto(){

let nombre=document.getElementById("nombre").value;
let rs=document.getElementById("rs").value;
let expediente=document.getElementById("expediente").value;
let ean=document.getElementById("ean").value;
let linea=document.getElementById("linea").value;
let titular=document.getElementById("titular").value;
let fabricante=document.getElementById("fabricante").value;
let pais=document.getElementById("pais").value;

let archivoRS=document.getElementById("pdfRS").files[0];
let archivoArte=document.getElementById("pdfArte").files[0];

let readerRS=new FileReader();
let readerArte=new FileReader();

readerRS.onload=function(){

let pdfRSbase64=readerRS.result;

readerArte.onload=function(){

let pdfArtebase64=readerArte.result;

let producto={

nombre:nombre,
rs:rs,
expediente:expediente,
ean:ean,
linea:linea,
titular:titular,
fabricante:fabricante,
pais:pais,
pdfRS:pdfRSbase64,
pdfArte:pdfArtebase64,
edicion:"ED1"

};

productos.push(producto);

localStorage.setItem("productos",JSON.stringify(productos));

alert("Producto guardado correctamente");

mostrarProductos();
mostrarPrioridades();

}

if(archivoArte){
readerArte.readAsDataURL(archivoArte);
}else{
readerArte.onload();
}

}

if(archivoRS){
readerRS.readAsDataURL(archivoRS);
}else{
readerRS.onload();
}

}

function mostrarProductos(){

let html="";

productos.forEach((p,i)=>{

html+=`

<div style="border:1px solid #ccc;padding:10px;margin:10px">

<b>${p.nombre}</b><br>

RS: ${p.rs}<br>

<button onclick="verRS(${i})">Ver RS</button>

<button onclick="verArte(${i})">Ver Arte</button>

<button onclick="revisionAutomatica(${i})">Revisión automática</button>

</div>

`;

});

document.getElementById("listaProductos").innerHTML=html;

}

function verRS(i){

let pdf=productos[i].pdfRS;

let ventana=window.open("");

ventana.document.write('<iframe width="100%" height="100%" src="'+pdf+'"></iframe>');

}

function verArte(i){

let pdf=productos[i].pdfArte;

let ventana=window.open("");

ventana.document.write('<iframe width="100%" height="100%" src="'+pdf+'"></iframe>');

}

function revisionAutomatica(i){

let p = productos[i];

let errores = [];

if(!p.rs || p.rs.trim()==""){
errores.push("Falta Registro Sanitario");
}

if(!p.ean || p.ean.trim()==""){
errores.push("Falta código EAN");
}

if(!p.titular || p.titular.trim()==""){
errores.push("Falta titular del registro");
}

if(!p.fabricante || p.fabricante.trim()==""){
errores.push("Falta fabricante");
}

if(!p.pais || p.pais.trim()==""){
errores.push("Falta país de fabricación");
}

if(!p.pdfArte){
errores.push("No se ha cargado el arte");
}

let resultado="";

if(errores.length==0){

resultado="<h3 style='color:green'>Arte listo para comunicar a DIGEMID</h3>";

}else{

resultado="<h3 style='color:red'>Errores encontrados</h3><ul>";

errores.forEach(e=>{
resultado+="<li>"+e+"</li>";
});

resultado+="</ul>";

}

document.getElementById("resultadoRevision").innerHTML=resultado;

mostrar("revision");

}

function mostrarPrioridades(){

let html="";

productos.forEach(p=>{

let prioridad="";

if(p.rs!=""){

prioridad="<span style='color:red'>URGENTE</span>";

}

else if(p.expediente!=""){

prioridad="<span style='color:orange'>MEDIA</span>";

}

else{

prioridad="<span style='color:green'>BAJA</span>";

}

html+=`

<div style="border:1px solid #ccc;padding:10px;margin:10px">

<b>${p.nombre}</b> - ${prioridad}

</div>

`;

});

document.getElementById("listaPrioridades").innerHTML=html;

}

window.onload=function(){

mostrarProductos();
mostrarPrioridades();

}
