//transform
function transformar(key) {
  key = key.toLowerCase().trim();
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  //part1
  const letras1 = key.slice(0, 3).split("");
  const parte1 = letras1.map(l => alphabet.indexOf(l) + 1).join("");

  //part2
  const letras2 = key.slice(3, 6).split("");
  let parte2 = "";
  for (let l of letras2) {
    const idx = alphabet.indexOf(l);
    const anterior = alphabet[(idx - 1 + 26) % 26];
    const siguiente = alphabet[(idx + 1) % 26];
    parte2 += anterior + siguiente; 
  }

  //part3
  const letras3 = key.slice(6).split("");
  const parte3 = letras3.map(l => 64 - (alphabet.indexOf(l) + 1)).join("");

  //part4
  const ultimo = parte3[parte3.length - 1];
  const div7 = Math.floor(parseInt(ultimo) / 7);

  return parte1 + parte2 + parte3 + div7;
}

//login
function verificar() {
  const key = document.getElementById("key").value;
  const mensaje = document.getElementById("mensaje");


  const dermWord1 = "741zbkmtv5150491";
  const transformada = transformar(key);

  if (transformada === dermWord1) {
    localStorage.setItem("logeado", "true");
    window.location.href = "menu.html";
  } else {
    mensaje.textContent = "Acceso denegado";
  }
}

//keyed
window.onload = function () {
  const actual = window.location.pathname.split("/").pop();

  if (actual !== "index.html") {
    if (localStorage.getItem("logeado") !== "true") {
      window.location.href = "index.html";
    }
  }

  if (actual === "index.html") {
    const input = document.getElementById("key");
    if (input) {
      input.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
          event.preventDefault();
          verificar();
        }
      });
    }
  }
};

//deleted keyed
function logout() {
  localStorage.removeItem("logeado");
  window.location.href = "index.html";
}
