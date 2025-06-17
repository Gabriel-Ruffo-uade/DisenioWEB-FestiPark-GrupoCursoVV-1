// Validación del formulario

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("formContacto");
  const mensajeError = document.getElementById("mensajeError");
  const mensajeExito = document.getElementById("mensajeExito");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // No envía el formulario

    const nombre = document.getElementById("nombre").value.trim();
	  const apellido = document.getElementById("apellido").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (nombre && apellido && emailValido && mensaje) {
      mensajeError.classList.add("hidden");
      mensajeExito.classList.remove("hidden");
      form.reset();
    } else {
      mensajeError.classList.remove("hidden");
    }
  });
});