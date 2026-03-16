function mostrar(panel){

let paneles=document.querySelectorAll(".panel");

paneles.forEach(p=>{
p.style.display="none";
});

document.getElementById(panel).style.display="block";

}

// Cargar productos guardados
let productos = JSON.parse(localStorage.getItem("productos")) || [];

// Guardar producto
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

// Guardar en navegador
localStorage.setItem("productos", JSON.stringify(productos));

alert("Producto guardado correctamente");

mostrarProductos();

}

// Mostrar productos
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

// Mostrar productos al abrir
window.onload = function(){
mostrarProductos();
};
