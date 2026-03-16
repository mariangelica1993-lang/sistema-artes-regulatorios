function mostrar(panel){

document.querySelectorAll(".panel").forEach(p=>{
p.style.display="none";
});

document.getElementById(panel).style.display="block";

}

let productos=JSON.parse(localStorage.getItem("productos")) || [];

function guardarProducto(){

let producto={

nombre:document.getElementById("nombre").value,
rs:document.getElementById("rs").value,
expediente:document.getElementById("expediente").value,
ean:document.getElementById("ean").value,
linea:document.getElementById("linea").value,
titular:document.getElementById("titular").value,
fabricante:document.getElementById("fabricante").value,
pais:document.getElementById("pais").value,
caja:document.getElementById("caja").value,
etiqueta:document.getElementById("etiqueta").value,
inserto:document.getElementById("inserto").value,
edicion:"ED1",
artes:[]

};

productos.push(producto);

localStorage.setItem("productos",JSON.stringify(productos));

alert("Producto guardado");

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

Expediente: ${p.expediente}<br>

Titular: ${p.titular}<br>

Linea: ${p.linea}<br>

Fabricante: ${p.fabricante}<br>

Pais: ${p.pais}<br>

Edición actual: ${p.edicion}<br>

<button onclick="nuevaEdicion(${i})">Nueva edición</button>

</div>

`;

});

document.getElementById("listaProductos").innerHTML=html;

}

function nuevaEdicion(i){

let numero=parseInt(productos[i].edicion.replace("ED",""));

numero++;

productos[i].edicion="ED"+numero;

localStorage.setItem("productos",JSON.stringify(productos));

mostrarProductos();

}

function mostrarPrioridades(){

let html="";

productos.forEach(p=>{

let prioridad="";

if(p.rs!=""){

prioridad='<span class="prioridad-alta">URGENTE</span>';

}

else if(p.expediente!=""){

prioridad='<span class="prioridad-media">MEDIA</span>';

}

else{

prioridad='<span class="prioridad-baja">BAJA</span>';

}

html+=`

<div style="border:1px solid #ccc;padding:10px;margin:10px">

<b>${p.nombre}</b>

${prioridad}

</div>

`;

});

document.getElementById("listaPrioridades").innerHTML=html;

}

window.onload=function(){

mostrarProductos();
mostrarPrioridades();

}
