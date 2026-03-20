function mostrar(panel){

document.querySelectorAll(".panel").forEach(p=>{
p.style.display="none";
});

document.getElementById(panel).style.display="block";

}

let productos = JSON.parse(localStorage.getItem("productos")) || [];

/* =========================
   GENERAR CODIGO MATERIAL
========================= */
function generarCodigoMaterial(titular,tipo,index){

let numero = String(index+1).padStart(3,"0");

if(titular.includes("ALVID")){

if(tipo=="inserto") return "ALVIN"+numero;
if(tipo=="inmediato") return "ALVRI"+numero;
if(tipo=="mediato") return "ALVRM"+numero;

}

if(titular.includes("CODEX")){

if(tipo=="inserto") return "CDXIN"+numero;
if(tipo=="inmediato") return "CDXRI"+numero;
if(tipo=="mediato") return "CDXRM"+numero;

}

}

/* =========================
   GUARDAR PRODUCTO
========================= */
function guardarProducto(){

let nombre=document.getElementById("nombre").value;
let rs=document.getElementById("rs").value;
let expediente=document.getElementById("expediente").value;
let ean=document.getElementById("ean").value;
let linea=document.getElementById("linea").value;
let titular=document.getElementById("titular").value;
let fabricante=document.getElementById("fabricante").value;
let pais=document.getElementById("pais").value;

let archivo=document.getElementById("pdf").files[0];

let reader=new FileReader();

reader.onload=function(){

let arte=reader.result;

let index=productos.length;

let producto={

nombre:nombre,
rs:rs,
expediente:expediente,
ean:ean,
linea:linea,
titular:titular,
fabricante:fabricante,
pais:pais,

artes:{

inserto:{
codigo:generarCodigoMaterial(titular,"inserto",index),
archivo:arte,
estado:"Pendiente"
},

inmediato:{
codigo:generarCodigoMaterial(titular,"inmediato",index),
archivo:null,
estado:"Pendiente"
},

mediato:{
codigo:generarCodigoMaterial(titular,"mediato",index),
archivo:null,
estado:"Pendiente"
}

}

};

productos.push(producto);

localStorage.setItem("productos",JSON.stringify(productos));

alert("Producto guardado");

actualizarTodo();

}

if(archivo){
reader.readAsDataURL(archivo);
}

}

/* =========================
   ACTUALIZAR TODO
========================= */
function actualizarTodo(){

mostrarProductos();
mostrarPrioridades();
mostrarPanelDiseno();

}

/* =========================
   LISTA PRODUCTOS
========================= */
function mostrarProductos(){

let html="";

productos.forEach((p,i)=>{

html+=`

<div style="border:1px solid #ccc;padding:10px;margin:10px">

<b>${p.nombre}</b><br>

RS: ${p.rs}<br>

Estado inserto: ${p.artes.inserto.estado}<br>

<button onclick="verArte(${i})">Ver Inserto</button>

<button onclick="revisionAutomatica(${i})">Revisión</button>

<button onclick="cambiarEstado(${i})">Cambiar estado</button>

</div>

`;

});

document.getElementById("listaProductos").innerHTML=html;

}

/* =========================
   VER PDF
========================= */
function verArte(i){

let pdf=productos[i].artes.inserto.archivo;

let ventana=window.open("");

ventana.document.write('<iframe width="100%" height="100%" src="'+pdf+'"></iframe>');

}

/* =========================
   CAMBIAR ESTADO
========================= */
function cambiarEstado(i){

let estados=["Pendiente","En revisión","Aprobado","Listo para comunicar"];

let actual=productos[i].artes.inserto.estado;

let index=estados.indexOf(actual);

let siguiente=estados[(index+1)%estados.length];

productos[i].artes.inserto.estado=siguiente;

localStorage.setItem("productos",JSON.stringify(productos));

actualizarTodo();

}

/* =========================
   REVISION AUTOMATICA
========================= */
async function revisionAutomatica(i){

let producto = productos[i];

let pdfData = producto.artes.inserto.archivo;

if(!pdfData){

document.getElementById("resultadoRevision").innerHTML=
"<h3 style='color:red'>No hay inserto cargado</h3>";

mostrar("revision");
return;

}

let loadingTask = pdfjsLib.getDocument(pdfData);
let pdf = await loadingTask.promise;

let textoCompleto="";

for(let pageNum=1; pageNum<=pdf.numPages; pageNum++){

let page = await pdf.getPage(pageNum);
let textContent = await page.getTextContent();

textContent.items.forEach(item=>{
textoCompleto += item.str + " ";
});

}

textoCompleto = textoCompleto.toLowerCase();

let errores=[];

if(!textoCompleto.includes("registro sanitario"))
errores.push("Falta Registro Sanitario");

if(!textoCompleto.includes("condición de venta"))
errores.push("Falta condición de venta");

if(!textoCompleto.includes("fabricante"))
errores.push("Falta fabricante");

if(!textoCompleto.includes("titular"))
errores.push("Falta titular");

if(!textoCompleto.includes("mantener fuera"))
errores.push("Falta advertencia sanitaria");

/* GENERAR INFORME */

let fecha=new Date().toLocaleDateString();

let informe=`
<h3>Informe de revisión</h3>
Producto: ${producto.nombre}<br>
Fecha: ${fecha}<br><br>
`;

if(errores.length==0){

informe+="<span style='color:green'>Cumple requisitos</span>";

}else{

informe+="<span style='color:red'>Observaciones:</span><ul>";

errores.forEach(e=>{
informe+="<li>"+e+"</li>";
});

informe+="</ul>";

}

document.getElementById("resultadoRevision").innerHTML=informe;

mostrar("revision");

}

/* =========================
   PANEL PRIORIDADES
========================= */
function mostrarPrioridades(){

let html="";

productos.forEach(p=>{

let prioridad="";

if(p.rs){

prioridad="<span style='color:red'>URGENTE</span>";

}else if(p.expediente){

prioridad="<span style='color:orange'>MEDIA</span>";

}else{

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

/* =========================
   PANEL DISEÑADOR
========================= */
function mostrarPanelDiseno(){

let html="<h3>Panel Diseñador</h3>";

productos.forEach(p=>{

html+=`
<div style="border:1px solid #ccc;padding:10px;margin:10px">

<b>${p.nombre}</b><br>
Estado: ${p.artes.inserto.estado}

</div>
`;

});

document.getElementById("resultadoRevision").innerHTML+=html;

}

window.onload=function(){

actualizarTodo();

}
