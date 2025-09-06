// Mapeo de números para la ofuscación
const numMap = { 
  "6": "4", "4": "6", 
  "2": "8", "8": "2", 
  "7": "3", "3": "7", 
  "9": "1", "1": "9", 
  "5": "0", "0": "5" 
};

const alphabet = "abcdefghijklmnopqrstuvwxyz";

// Función que transforma la matrícula ingresada según el algoritmo
function transformar(matricula) {
  matricula = matricula.toLowerCase().trim();
  if (matricula.length < 3) return "";

  let salida = [];

  // letra inicial + tercer número
  let primerLetra = matricula[0];
  let tercerNum = parseInt(matricula[3]);
  if (isNaN(tercerNum)) tercerNum = 0;

  if (/[a-z]/.test(primerLetra)) {
    let base = alphabet.indexOf(primerLetra);
    let nuevaPos = (base + tercerNum) % 26;
    salida.push(alphabet[nuevaPos]);
  } else {
    salida.push(primerLetra);
  }

  // resto de la matrícula
  for (let i = 1; i < matricula.length; i++) {
    let ch = matricula[i];
    salida.push(numMap[ch] || ch);
  }

  return salida.join("");
}

// Función de login
async function verificar() {
  const matricula = document.getElementById("matricula").value;
  const mensaje = document.getElementById("mensaje");

  try {
    const resp = await fetch("matriculas.json");
    const data = await resp.json();
    const validas = data.matriculas.map(m => m.toLowerCase());

    const ofuscada = transformar(matricula);

    console.log("Matrícula transformada:", ofuscada); // Para depuración

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

// Proteger todas las páginas excepto index.html
window.onload = function() {
  const actual = window.location.pathname.split("/").pop();
  if (actual !== "index.html") {
    if (localStorage.getItem("logeado") !== "true") {
      window.location.href = "index.html";
    }
  }
}

// Cerrar sesión
function logout() {
  localStorage.removeItem("logeado");
  window.location.href = "index.html";
}
