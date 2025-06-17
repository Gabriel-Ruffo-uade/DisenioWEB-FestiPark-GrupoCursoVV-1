//evento de scroll para hacer transparente el header
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 10) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

window.onload = function() {
//Constante para mostrar informacion de las tarjetas
const infoImagenes = [
	{ titulo: "Vuelta al mundo", informacion: "Diversión para toda la familia" },
	{ titulo: "Sorprendente", informacion: "Tu familia no lo va a olvidar nunca" },
	{ titulo: "Diversión", informacion: "Momentos únicos con tus amigos" },
	{ titulo: "Recuerdos", informacion: "Momentos únicos en familia" },
	{ titulo: "Montaña Rusa", informacion: "La montaña rusa más grande del mundo" },
	{ titulo: "Adrenalina", informacion: "Solo para valientes" }
];

//selectores y configuracion inicial
const cards = document.querySelectorAll(".card");
const dots = document.querySelectorAll(".dot");
const tituloImagen = document.querySelector(".titulo-nombre");
const descripcionImagen = document.querySelector(".descripcion-nombre");
const leftArrow = document.querySelector(".nav-arrow.left");
const rightArrow = document.querySelector(".nav-arrow.right");
let currentIndex = 0;
let isAnimating = false;

function updateCarousel(newIndex) {
	if (isAnimating) return;
	isAnimating = true;

	currentIndex = (newIndex + cards.length) % cards.length;

	cards.forEach((card, i) => {
		const offset = (i - currentIndex + cards.length) % cards.length;

		card.classList.remove(
			"center",
			"left-1",
			"left-2",
			"right-1",
			"right-2",
			"hidden"
		);

		if (offset === 0) {
			card.classList.add("center");
		} else if (offset === 1) {
			card.classList.add("right-1");
		} else if (offset === 2) {
			card.classList.add("right-2");
		} else if (offset === cards.length - 1) {
			card.classList.add("left-1");
		} else if (offset === cards.length - 2) {
			card.classList.add("left-2");
		} else {
			card.classList.add("hidden");
		}
	});

	dots.forEach((dot, i) => {
		dot.classList.toggle("active", i === currentIndex);
	});

	tituloImagen.style.opacity = "0";
	descripcionImagen.style.opacity = "0";

	setTimeout(() => {
		tituloImagen.textContent = infoImagenes[currentIndex].titulo;
		descripcionImagen.textContent = infoImagenes[currentIndex].informacion;
		tituloImagen.style.opacity = "1";
		descripcionImagen.style.opacity = "1";
	}, 300);

	setTimeout(() => {
		isAnimating = false;
	}, 800);
}

leftArrow.addEventListener("click", () => {
	updateCarousel(currentIndex - 1);
});

rightArrow.addEventListener("click", () => {
	updateCarousel(currentIndex + 1);
});

dots.forEach((dot, i) => {
	dot.addEventListener("click", () => {
		updateCarousel(i);
	});
});

cards.forEach((card, i) => {
	card.addEventListener("click", () => {
		updateCarousel(i);
	});
});

document.addEventListener("keydown", (e) => {
	if (e.key === "ArrowLeft") {
		updateCarousel(currentIndex - 1);
	} else if (e.key === "ArrowRight") {
		updateCarousel(currentIndex + 1);
	}
});

let touchStartX = 0;
let touchEndX = 0;

document.addEventListener("touchstart", (e) => {
	touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener("touchend", (e) => {
	touchEndX = e.changedTouches[0].screenX;
	handleSwipe();
});

function handleSwipe() {
	const swipeThreshold = 50;
	const diff = touchStartX - touchEndX;

	if (Math.abs(diff) > swipeThreshold) {
		if (diff > 0) {
			updateCarousel(currentIndex + 1);
		} else {
			updateCarousel(currentIndex - 1);
		}
	}
}

updateCarousel(0);
};


// Funcion de Modo oscuro y claro

const darkMode = document.getElementById("dark-mode")
const lightMode = document.getElementById("light-mode");
const root = document.documentElement;

function changeDarkMode() {
	root.style.setProperty("--color-principal", "#ffffff");
	root.style.setProperty("--color-secundario", "#2B2D42");
  root.style.setProperty("--dot", "#bcc8e333");
	lightMode.classList.remove('hidden');
  darkMode.classList.add('hidden');
  localStorage.setItem("theme", "dark");
}

function changeLightMode() {
	root.style.setProperty("--color-principal", "#2B2D42");
	root.style.setProperty("--color-secundario", "#ffffff");
  root.style.setProperty("--dot", "#082a7b33");
	lightMode.classList.add('hidden');
  darkMode.classList.remove('hidden');
  localStorage.setItem("theme", "light");
}

// Verifica el tema guardado al cargar
document.addEventListener('DOMContentLoaded', function () {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        changeDarkMode();
    } else {
        changeLightMode();
    }

    // Agrega los listeners después de que todo esté cargado
    if (darkMode && lightMode) {
        darkMode.addEventListener('click', changeDarkMode);
        lightMode.addEventListener('click', changeLightMode);
    }
});

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
