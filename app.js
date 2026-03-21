let empresaActual = "ALVID";

let data = {
ALVID: [
{nombre:"Levotiroxina", arte:"Inserto", ed:"ED3", rs:true, estado:"Urgente"},
{nombre:"Paracetamol 500 mg", arte:"Mediato", ed:"ED1", rs:false, expediente:true, estado:"Urgente"}
],
CODEX: [
{nombre:"Carbamazepina 200 mg", arte:"Inmediato", ed:"ED2", rs:false, expediente:false, estado:"Pendiente"}
]
};

function empresa(emp){
empresaActual = emp;
document.getElementById("empresaTitulo").innerText = emp;
actualizar();
}

function mostrar(panel){
document.getElementById("prioridades").style.display="none";
document.getElementById("tabla").style.display="none";

document.getElementById(panel).style.display="block";
}

function prioridad(p){

if(p.rs) return ["URGENTE","urgente"];
if(p.expediente) return ["MEDIA","media"];
return ["BAJA","baja"];

}

function actualizar(){
mostrarPrioridades();
mostrarTabla();
}

function mostrarPrioridades(){

let html="";

data[empresaActual].forEach((p,i)=>{

let pr = prioridad(p);

html+=`
<div class="item">

<div>
<b>${p.nombre}</b><br>
${p.arte}
</div>

<div>
<span class="badge ${pr[1]}">${pr[0]}</span>
<button>Abrir</button>
</div>

</div>
`;

});

document.getElementById("listaPrioridades").innerHTML=html;

}

function mostrarTabla(){

let html="";

data[empresaActual].forEach((p,i)=>{

let pr = prioridad(p);

html+=`
<tr>

<td>${p.nombre}</td>
<td>${p.arte}</td>
<td>${p.ed}</td>
<td><span class="badge ${pr[1]}">${pr[0]}</span></td>
<td>${p.estado}</td>
<td><button>Abrir</button></td>

</tr>
`;

});

document.getElementById("tablaProductos").innerHTML=html;

}

window.onload=function(){
actualizar();
};
