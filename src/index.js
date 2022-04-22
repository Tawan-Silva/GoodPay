var janelaPromocao = new bootstrap.Modal(document.getElementById("promo1"));


function rotaCadastro() {
  window.location.href = "../registro.html";
}
function rotaRecuperar() {
  window.location.href = "../recuperar.html";
}

function alertaPromo(){
  let titulo ="Promomção 1 [Quebra da Banca]";
  let corpo = "<h6>Super legal</h6> <p><img src='./img/4.png' width='160' height='160'></p> ";

  janelaPromocao.show();

  document.getElementById("titulo").innerHTML = titulo;
  document.getElementById("corpo").innerHTML = corpo; 
}
