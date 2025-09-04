// Verificar login en index.html
async function verificar() {
  const matricula = document.getElementById("matricula").value.trim().toLowerCase();
  const mensaje = document.getElementById("mensaje");

  try {
    const resp = await fetch("matriculas.json");
    const data = await resp.json();
    const validas = data.matriculas.map(m => m.toLowerCase());

    if (validas.includes(matricula)) {
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
