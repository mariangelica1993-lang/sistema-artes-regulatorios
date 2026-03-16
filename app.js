function mostrar(panel){

let paneles=document.querySelectorAll(".panel");

paneles.forEach(p=>{
p.style.display="none";
});

document.getElementById(panel).style.display="block";

}

let productos=[];

function guardarProducto(){

let nombre=document.getElementById("nombre").value;
let rs=document.getElementById("rs").value;
let ean=document.getElementById("ean").value;
let linea=document.getElementById("linea").value;
let titular=document.getElementById("titular").value;
let fabricante=document.getElementById("fabricante").value;
let dimensiones=document.getElementById("dimensiones").value;

let producto={
nombre:nombre,
rs:rs,
ean:ean,
linea:linea,
titular:titular,
fabricante:fabricante,
dimensiones:dimensiones
};

productos.push(producto);

mostrarProductos();

alert("Producto guardado correctamente");

}

function mostrarProductos(){

let contenedor=document.getElementById("buscar");

let html="<h2>Productos registrados</h2>";

productos.forEach(p=>{

html+=`
<div style="border:1px solid #ccc;padding:10px;margin:10px">
<b>${p.nombre}</b><br>
RS: ${p.rs}<br>
EAN: ${p.ean}<br>
Linea terapéutica: ${p.linea}<br>
Titular: ${p.titular}<br>
Fabricante: ${p.fabricante}<br>
Dimensiones: ${p.dimensiones}
</div>
`;

});

contenedor.innerHTML=html;

}
