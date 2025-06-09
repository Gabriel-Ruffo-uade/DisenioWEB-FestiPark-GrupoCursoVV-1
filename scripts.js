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
	{ titulo: "Vuelta al mundo", informacion: "Diversion para toda la familia" },
	{ titulo: "Sorprendente", informacion: "Tu familia no lo va a olvidar nunca" },
	{ titulo: "Diversion", informacion: "Momentos unicos con tus amigos" },
	{ titulo: "Recuerdos", informacion: "Momentos unicos en familia" },
	{ titulo: "Montaña Rusa", informacion: "La montaña rusa mas grande del mundo" },
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
	lightMode.classList.remove('hidden');
    darkMode.classList.add('hidden');
}

function changeLightMode() {
	root.style.setProperty("--color-principal", "#2B2D42");
	root.style.setProperty("--color-secundario", "#ffffff");
	lightMode.classList.add('hidden');
    darkMode.classList.remove('hidden');
}

if (darkMode && lightMode) {
	lightMode.addEventListener("click", changeLightMode);
	darkMode.addEventListener("click", changeDarkMode);
}