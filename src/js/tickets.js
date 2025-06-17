document.addEventListener('DOMContentLoaded', function () {
// Validación compra de tickets
    const formulario = document.getElementById("compra");
    const selectPromocion = document.getElementById("promocion");
    const formTickets = document.getElementById("form-tickets");
    const inputPromoOculta = document.getElementById("promo-seleccionada");

    const adultosInput = document.getElementById("adultos");
    const ninosInput = document.getElementById("ninos");

    const mensajeError = document.getElementById("mensaje-error");
    const resumen = document.getElementById("resumen-compra");
    const resumenTexto = document.getElementById("resumen-texto");

    // Mostrar formulario y autocompletar según promo
    selectPromocion.addEventListener("change", () => {
      const promo = selectPromocion.value;

      inputPromoOculta.value = promo;

      if (promo === "") {
        formTickets.classList.add("hidden");
        adultosInput.value = "";
        adultosInput.readOnly = false;
        ninosInput.value = "";
        ninosInput.readOnly = false;
      } else {
        formTickets.classList.remove("hidden");

        switch (promo) {
          case "Pack Familiar":
            adultosInput.value = 2;
            adultosInput.readOnly = true;
            ninosInput.value = 2;
            ninosInput.readOnly = true;
            break;
          case "Cumpleaños":
            adultosInput.value = 1;
            adultosInput.readOnly = true;
            ninosInput.value = 0;
            ninosInput.readOnly = true;
            break;
          case "Jóvenes Aventureros":
            adultosInput.value = 2;
            adultosInput.readOnly = true;
            ninosInput.value = 0;
            ninosInput.readOnly = true;
            break;
          case "Pack Anual":
            adultosInput.value = 1;
            adultosInput.readOnly = true;
            ninosInput.value = 0;
            ninosInput.readOnly = true;
            break;
          default:
            adultosInput.value = "";
            adultosInput.readOnly = false;
            ninosInput.value = "";
            ninosInput.readOnly = false;
            break;
        }
      }
    });

    // Manejar el envío del formulario
    formTickets.addEventListener("submit", (event) => {
      event.preventDefault();

      // Limpiar mensaje error
      mensajeError.textContent = "";
      mensajeError.classList.add("hidden");

      const nombre = document.getElementById("nombre").value.trim();
      const email = document.getElementById("email").value.trim();
      const adultos = parseInt(adultosInput.value, 10);
      const ninos = parseInt(ninosInput.value, 10);
      const fecha = document.getElementById("fecha").value;
      const promo = inputPromoOculta.value;

      // Validar campos obligatorios
      if ((isNaN(adultos) || adultos === 0) && (isNaN(ninos) || ninos === 0)) {
        mensajeError.textContent = "Debés ingresar al menos un adulto o un niño.";
        mensajeError.classList.remove("hidden");
        return;
      }

      if (!nombre || !email || !fecha) {
        mensajeError.textContent = "Por favor completa todos los campos correctamente.";
        mensajeError.classList.remove("hidden");
        return;
      }

      if (!/\S+@\S+\.\S+/.test(email)) {
        mensajeError.textContent = "Por favor ingresá un correo válido.";
        mensajeError.classList.remove("hidden");
        return;
      }
      

      // Calcular total
      const precioAdulto = 20000;
      const precioNino = 10000;
      const precioPackAnual = 100000;
      let total = 0;

      switch (promo) {
        case "Pack Familiar":
          // 4x3: se descuenta 1 adulto
          total = precioAdulto * (adultos - 1) + precioNino * ninos;
          break;
        case "Jóvenes Aventureros":
          // 2x1: solo paga 1 adulto, niños 0
          total = precioAdulto * 1;
          break;
        case "Cumpleaños":
          // Gratis
          total = 0;
          break;
        case "Pack Anual":
          // Precio del pack
          total = precioPackAnual;
          break;
        default:
          // Estándar: suma normal
          if (isNaN(ninos)) {
            total = precioAdulto * adultos;
            break;
          }
          else if (isNaN(adultos)) {
            total = precioNino * ninos;
            break;
          }
          else {
            total = precioAdulto * adultos + precioNino * ninos;
            break;
          }
      }

      // Mostrar resumen
      resumenTexto.innerHTML = `
        <strong>Nombre:</strong> ${nombre} <br>
        <strong>Email:</strong> ${email} <br>
        <strong>Promoción:</strong> ${promo || "Estándar"} <br>
        <strong>Adultos:</strong> ${adultos} <br>
        <strong>Niños:</strong> ${ninos} <br>
        <strong>Fecha de visita:</strong> ${fecha} <br>
        <strong>Total a pagar:</strong> $${total.toLocaleString()}
      `;
      resumen.hidden = false;
      formulario.classList.add("hidden");
    });

    const botonFinalizar = document.getElementById("boton-finalizar");
    const mensajeFinal = document.getElementById("mensaje-final");

    botonFinalizar.addEventListener("click", (e) => {
      e.preventDefault();

      // Ocultar la sección del resumen
      resumen.hidden = true;

      // Mostrar el mensaje final
      mensajeFinal.textContent = "¡Gracias por su compra!";
      mensajeFinal.classList.remove("hidden");
    });
});
