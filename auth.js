// Lista de "matrículas" o contraseñas válidas
// Por ahora solo "pulpo", pero puedes poner más:
const clavesValidas = ["pulpo", "A01637664", "abcde"];

function pedirClave() {
  let intentos = 3;
  while (intentos > 0) {
    let clave = prompt("Ingresa tu matrícula o clave:");
    if (clavesValidas.includes(clave)) {
      alert("Acceso concedido ✅");
      return true;
    } else {
      intentos--;
      alert("Clave incorrecta. Te quedan " + intentos + " intentos.");
    }
  }

  // Si falla los intentos, redirige a otra página o bloquea
  document.body.innerHTML = "<h1>Acceso denegado 🚫</h1>";
  return false;
}
