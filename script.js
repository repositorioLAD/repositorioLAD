// reglas de sustitución numérica
const numMap = { "6": "4", "4": "6", "2": "8", "8": "2", "7": "3", "3": "7", "9": "1", "1": "9", "5": "0", "0": "5" };
const alphabet = "abcdefghijklmnopqrstuvwxyz";

function transformar(matricula) {
  matricula = matricula.toLowerCase();
  let salida = [];

  // letra inicial
  if (/[a-z]/.test(matricula[0])) {
    let base = alphabet.indexOf(matricula[0]);      // posición 0-25
    let tercerNum = parseInt(matricula[2]);         // tercer dígito
    let nuevaPos = (base + tercerNum) % 26;
    salida.push(alphabet[nuevaPos]);
  } else {
    salida.push(matricula[0]);
  }

  // resto de la matrícula
  for (let i = 1; i < matricula.length; i++) {
    let ch = matricula[i];
    salida.push(numMap[ch] || ch);
  }

  return salida.join("");
}

// Verificar login en index.html
async function verificar() {
  const matricula = document.getElementById("matricula").value.trim().toLowerCase();
  const mensaje = document.getElementById("mensaje");

  try {
    const resp = await fetch("matriculas.json");
    const data = await resp.json();
    const validas = data.matriculas;

    const ofuscada = transformar(matricula);

    if (validas.includes(ofuscada)) {
      localStorage.setItem("logeado", "true");
      window.location.href = "menu.html";
    } else {
      mensaje.textContent = "Acceso denegado";
    }
  } catch (err) {
    mensaje.textContent = "Error cargando datos";
    console.error(err);
  }
}

// Proteger páginas distintas de index
window.onload = function() {
  const actual = window.location.pathname.split("/").pop();
  if (actual !== "index.html") {
    if (localStorage.getItem("logeado") !== "true") {
      window.location.href = "index.html";
    }
  }
}

// Logout
function logout() {
  localStorage.removeItem("logeado");
  window.location.href = "index.html";
}
