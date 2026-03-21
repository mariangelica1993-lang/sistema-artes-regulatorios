let empresaActual = "ALVID";

let baseDatos = {
ALVID: [],
CODEX: []
};

/* ===== DATOS DEMO ===== */
baseDatos.ALVID = [
{nombre:"Levotiroxina", arte:"Inserto", ed:"ED3", rs:true, estado:"Urgente"},
{nombre:"Paracetamol 500 mg", arte:"Mediato", ed:"ED1", expediente:true, estado:"En revisión"}
];

baseDatos.CODEX = [
{nombre:"Carbamazepina 200 mg", arte:"Inmediato", ed:"ED2", estado:"Pendiente"}
];

/* ===== CAMBIAR EMPRESA ===== */
function cambiarEmpresa(emp){
empresaActual = emp;
document.getElementById("empresaTitulo").innerText = emp;
actualizar();
}

/* ===== PRIORIDAD ===== */
function getPrioridad(p){

if(p.rs) return ["URGENTE","urgente"];
if(p.expediente) return ["MEDIA","media"];
return ["BAJA","baja"];

}

/* ===== MOSTRAR PRIORIDADES ===== */
function mostrarPrioridades(){

let html="";

baseDatos[empresaActual].forEach(p=>{

let pr = getPrioridad(p);

html+=`
<div class="item">

<div>
<b>${p.nombre}</b><br>
${p.arte}
</div>

<div>
<span class="badge ${pr[1]}">${pr[0]}</span>
<button class="action">Abrir</button>
</div>

</div>
`;

});

document.getElementById("prioridades").innerHTML=html;

}

/* ===== TABLA ===== */
function mostrarTabla(lista){

let html="";

lista.forEach(p=>{

let pr = getPrioridad(p);

html+=`
<tr>

<td>${p.nombre}</td>
<td>${p.arte}</td>
<td>${p.ed}</td>
<td><span class="badge ${pr[1]}">${pr[0]}</span></td>
<td>${p.estado}</td>
<td><button class="action">Abrir</button></td>

</tr>
`;

});

document.getElementById("lista").innerHTML=html;

}

/* ===== BUSCADOR ===== */
function buscar(texto){

let filtrados = baseDatos[empresaActual].filter(p=>
p.nombre.toLowerCase().includes(texto.toLowerCase())
);

mostrarTabla(filtrados);

}

/* ===== MOSTRAR ===== */
function mostrar(panel){

document.getElementById("dashboard").style.display="none";
document.getElementById("tabla").style.display="none";

document.getElementById(panel).style.display="block";

}

/* ===== ACTUALIZAR ===== */
function actualizar(){
mostrarPrioridades();
mostrarTabla(baseDatos[empresaActual]);
}

/* ===== INIT ===== */
window.onload=function(){
actualizar();
};
