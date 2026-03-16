function mostrar(panel){

let paneles=document.querySelectorAll(".panel");

paneles.forEach(p=>{
p.style.display="none";
});

document.getElementById(panel).style.display="block";

}
