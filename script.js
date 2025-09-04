const numMap = { "6": "4", "4": "6", "2": "8", "8": "2", "7": "3", "3": "7", "9": "1", "1": "9", "5": "0", "0": "5" };
const alphabet = "abcdefghijklmnopqrstuvwxyz";

// transforma la matrícula ingresada según tu algoritmo
function transformar(matricula) {
  matricula = matricula.toLowerCase().trim();
  if (matricula.length < 3) return ""; // seguridad

  let salida = [];

  // letra inicial
  if (/[a-z]/.test(matricula[0])) {
    let base = alphabet.indexOf(matricula[0]);
    let tercerNum = parseInt(matricula[2]);
    if (isNaN(tercerNum)) tercerNum = 0;
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

// función de login
async function verificar() {
  const matricula = document.getElementById("matricula").value;
  const mensaje = document.getElementById("mensaje");

  try {
    const resp = await fetch("matriculas.json");
    const data = await resp.json();
    const validas = data.matriculas.map(m => m.toLowerCase());

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

// proteger todas las páginas excepto index
window.onload = function() {
  const actual = window.location.pathname.split("/").pop();
  if (actual !== "index.html") {
    if (localStorage.getItem("logeado") !== "true") {
      window.location.href = "index.html";
    }
  }
}

// cerrar sesión
function logout() {
  localStorage.removeItem("logeado");
  window.location.href = "index.html";
}
