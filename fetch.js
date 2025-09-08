const numMap = { 
  "6": "4", "4": "6", 
  "2": "8", "8": "2", 
  "7": "3", "3": "7", 
  "9": "1", "1": "9", 
  "5": "0", "0": "5" 
};

const alphabet = "abcdefghijklmnopqrstuvwxyz";

//transform
function transformar(key) {
  key = key.toLowerCase().trim();
  if (key.length < 3) return "";

  let salida = [];

  //letrado
  let primerLetra = key[0];
  let tercerNum = parseInt(key[3]);
  if (isNaN(tercerNum)) tercerNum = 0;

  if (/[a-z]/.test(primerLetra)) {
    let base = alphabet.indexOf(primerLetra);
    let nuevaPos = (base + tercerNum) % 26;
    salida.push(alphabet[nuevaPos]);
  } else {
    salida.push(primerLetra);
  }

  //numerico
  for (let i = 1; i < key.length; i++) {
    let ch = key[i];
    salida.push(numMap[ch] || ch);
  }

  return salida.join("");
}

//login
async function verificar() {
  const key = document.getElementById("key").value;
  const mensaje = document.getElementById("mensaje");

  try {
    const resp = await fetch("keys.json");
    const data = await resp.json();
    const validas = data.keys.map(m => m.toLowerCase());

    const ofuscada = transformar(key);

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
window.onload = function () {
    const actual = window.location.pathname.split("/").pop();

    // proteger páginas
    if (actual !== "index.html") {
        if (localStorage.getItem("logeado") !== "true") {
            window.location.href = "index.html";
        }
    }

    // enter en el login
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


//logout
function logout() {
  localStorage.removeItem("logeado");
  window.location.href = "index.html";
}

