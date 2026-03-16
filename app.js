function mostrar(panel){

let paneles=document.querySelectorAll(".panel");

paneles.forEach(p=>{
p.style.display="none";
});

document.getElementById(panel).style.display="block";

}
let productos=[];

function guardarProducto(){

let producto={
nombre:document.getElementById("nombre").value,
rs:document.getElementById("rs").value,
ean:document.getElementById("ean").value,
linea:document.getElementById("linea").value,
titular:document.getElementById("titular").value,
fabricante:document.getElementById("fabricante").value,
dimensiones:document.getElementById("dimensiones").value
};

productos.push(producto);

mostrarProductos();

alert("Producto guardado");

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
Línea terapéutica: ${p.linea}<br>
Titular: ${p.titular}<br>
Fabricante: ${p.fabricante}<br>
Dimensiones: ${p.dimensiones}
</div>
`;

});

contenedor.innerHTML=html;

}
