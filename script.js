async function verificar() {
    const input = document.getElementById("matricula").value.trim();
    const mensaje = document.getElementById("mensaje");
  
    try {
      // Cargar la lista desde el JSON
      const response = await fetch("matriculas.json");
      const data = await response.json();
      const validas = data.validas;
  
      // Normalizar (ignorar mayúsculas/minúsculas)
      const normalizado = input.toLowerCase();
      const listaNormalizada = validas.map(m => m.toLowerCase());
  
      if (listaNormalizada.includes(normalizado)) {
        // ✅ mostrar contenido
        document.getElementById("login").style.display = "none";
        document.getElementById("contenido").style.display = "block";
      } else {
        // ❌ acceso denegado
        mensaje.textContent = "Acceso denegado. Intenta de nuevo.";
      }
    } catch (error) {
      console.error("Error al cargar matriculas.json:", error);
      mensaje.textContent = "Hubo un problema al verificar la matrícula.";
    }
  }
  