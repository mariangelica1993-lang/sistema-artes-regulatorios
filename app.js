let empresaActual = "ALVID";

let db = JSON.parse(localStorage.getItem("db")) || {
ALVID: [],
CODEX: []
};

/* ===== CAMBIAR MODULO ===== */
function abrirModulo(emp,modulo){

empresaActual = emp;

document.getElementById("titulo").innerText = emp.toUpperCase();

["prioridades","cargar","revision"].forEach(id=>{
document.getElementById(id).style.display="none";
});

document.getElementById(modulo).style.display="block";

actualizar();

}

/* ===== GUARDAR ===== */
function guardar(){

let nombre = document.getElementById("nombre").value;
let rs = document.getElementById("rs").value;
let expediente = document.getElementById("expediente").value;
let ean = document.getElementById("ean").value;
let fabricante = document.getElementById("fabricante").value;
let pais = document.getElementById("pais").value;

let archivo = document.getElementById("pdf").files[0];

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

db[empresaActual].push(producto);

localStorage.setItem("db", JSON.stringify(db));

alert("Guardado en " + empresaActual);

actualizar();

};

if(archivo){
reader.readAsDataURL(archivo);
}else{
reader.onload();
}

}

/* ===== PRIORIDAD ===== */
function prioridad(p){

if(p.rs) return ["URGENTE","urgente"];
if(p.expediente) return ["MEDIA","media"];
return ["BAJA","baja"];

}

/* ===== MOSTRAR ===== */
function actualizar(){

mostrarLista(db[empresaActual]);

}

/* ===== MOSTRAR LISTA ===== */
function mostrarLista(lista){

let html="";

lista.forEach(p=>{

let pr = prioridad(p);

html+=`
<div style="border-bottom:1px solid #eee;padding:10px">

<b>${p.nombre}</b><br>

<span class="badge ${pr[1]}">${pr[0]}</span>

<button onclick="revisarPorNombre('${p.nombre}')">Revisar</button>

</div>
`;

});

document.getElementById("listaPrioridades").innerHTML=html;

}

/* ===== BUSCADOR ===== */
function buscarProducto(texto){

let filtrados = db[empresaActual].filter(p =>
p.nombre.toLowerCase().includes(texto.toLowerCase())
);

mostrarLista(filtrados);

}

/* ===== REVISION ===== */
function revisarPorNombre(nombre){

let index = db[empresaActual].findIndex(p => p.nombre === nombre);

let p = db[empresaActual][index];

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

abrirModulo(empresaActual,"revision");

}

/* ===== INIT ===== */
window.onload=function(){

abrirModulo("ALVID","prioridades");

};
