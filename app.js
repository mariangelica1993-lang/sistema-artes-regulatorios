function mostrar(panel){

document.querySelectorAll(".panel").forEach(p=>{
p.style.display="none";
});

document.getElementById(panel).style.display="block";

}

let productos = JSON.parse(localStorage.getItem("productos")) || [];

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

function guardarProducto(){

let nombre=document.getElementById("nombre").value;
let rs=document.getElementById("rs").value;
let expediente=document.getElementById("expediente").value;
let ean=document.getElementById("ean").value;
let linea=document.getElementById("linea").value;
let titular=document.getElementById("titular").value;
let fabricante=document.getElementById("fabricante").value;
let pais=document.getElementById("pais").value;

let archivoArte=document.getElementById("pdf").files[0];

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

edicion:"ED1",

artes:{

inserto:{
codigo:generarCodigoMaterial(titular,"inserto",index),
archivo:arte,
estado:"pendiente"
},

inmediato:{
codigo:generarCodigoMaterial(titular,"inmediato",index),
archivo:null,
estado:"pendiente"
},

mediato:{
codigo:generarCodigoMaterial(titular,"mediato",index),
archivo:null,
estado:"pendiente"
}

}

};

productos.push(producto);

localStorage.setItem("productos",JSON.stringify(productos));

alert("Producto guardado correctamente");

mostrarProductos();
mostrarPrioridades();

}

if(archivoArte){
reader.readAsDataURL(archivoArte);
}

}

function mostrarProductos(){

let html="";

productos.forEach((p,i)=>{

html+=`

<div style="border:1px solid #ccc;padding:10px;margin:10px">

<b>${p.nombre}</b><br>

RS: ${p.rs}<br>

Inserto: ${p.artes.inserto.codigo}<br>

Rotulado inmediato: ${p.artes.inmediato.codigo}<br>

Rotulado mediato: ${p.artes.mediato.codigo}<br><br>

<button onclick="verArte(${i},'inserto')">Ver Inserto</button>

<button onclick="revisionAutomatica(${i})">Revisión automática</button>

</div>

`;

});

document.getElementById("listaProductos").innerHTML=html;

}

function verArte(i,tipo){

let pdf=productos[i].artes[tipo].archivo;

let ventana=window.open("");

ventana.document.write('<iframe width="100%" height="100%" src="'+pdf+'"></iframe>');

}

async function revisionAutomatica(i){

let producto = productos[i];

if(!producto.artes.inserto.archivo){

document.getElementById("resultadoRevision").innerHTML=
"<h3 style='color:red'>No hay inserto cargado</h3>";

mostrar("revision");
return;

}

let pdfData = producto.artes.inserto.archivo;

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

/* Validaciones regulatorias */

if(!textoCompleto.includes("registro sanitario"))
errores.push("No se menciona Registro Sanitario");

if(!textoCompleto.includes("condición de venta"))
errores.push("Falta condición de venta");

if(!textoCompleto.includes("fabricante"))
errores.push("No se menciona fabricante");

if(!textoCompleto.includes("titular"))
errores.push("No se menciona titular del registro sanitario");

if(!textoCompleto.includes("vía de administración"))
errores.push("No se menciona vía de administración");

if(!textoCompleto.includes("mantener fuera del alcance"))
errores.push("Falta advertencia sanitaria");

/* Resultado */

let resultado="";

if(errores.length===0){

resultado="<h3 style='color:green'>✓ Arte cumple requisitos regulatorios básicos</h3>";

}else{

resultado="<h3 style='color:red'>Observaciones detectadas</h3><ul>";

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

if(p.rs){

prioridad="<span class='prioridad-alta'>URGENTE</span>";

}else if(p.expediente){

prioridad="<span class='prioridad-media'>MEDIA</span>";

}else{

prioridad="<span class='prioridad-baja'>BAJA</span>";

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
