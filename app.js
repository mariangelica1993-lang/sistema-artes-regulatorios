function mostrar(panel){

document.querySelectorAll(".panel").forEach(p=>{
p.style.display="none";
});

document.getElementById(panel).style.display="block";

}

// Base de datos local
let productos = JSON.parse(localStorage.getItem("productos")) || [];

// GUARDAR PRODUCTO
function guardarProducto(){

let nombre = document.getElementById("nombre").value;
let rs = document.getElementById("rs").value;
let expediente = document.getElementById("expediente").value;
let ean = document.getElementById("ean").value;
let linea = document.getElementById("linea").value;
let titular = document.getElementById("titular").value;
let fabricante = document.getElementById("fabricante").value;
let pais = document.getElementById("pais").value;

if(nombre==""){
alert("Debe ingresar el nombre del producto");
return;
}

let producto={

nombre:nombre,
rs:rs,
expediente:expediente,
ean:ean,
linea:linea,
titular:titular,
fabricante:fabricante,
pais:pais,
edicion:"ED1"

};

productos.push(producto);

// Guardar en navegador
localStorage.setItem("productos", JSON.stringify(productos));

alert("Producto guardado correctamente");

mostrarProductos();
mostrarPrioridades();

}

// MOSTRAR PRODUCTOS
function mostrarProductos(){

let contenedor=document.getElementById("listaProductos");

if(!contenedor) return;

let html="";

productos.forEach((p,i)=>{

html+=`
<div style="border:1px solid #ccc;padding:10px;margin:10px">

<b>${p.nombre}</b><br>

RS: ${p.rs}<br>
Expediente: ${p.expediente}<br>
Titular: ${p.titular}<br>
Fabricante: ${p.fabricante}<br>

Edición actual: ${p.edicion}

</div>
`;

});

contenedor.innerHTML=html;

}

// PRIORIDADES
function mostrarPrioridades(){

let contenedor=document.getElementById("listaPrioridades");

if(!contenedor) return;

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

contenedor.innerHTML=html;

}

// CARGAR DATOS AL ABRIR
window.onload=function(){

mostrarProductos();
mostrarPrioridades();

}
