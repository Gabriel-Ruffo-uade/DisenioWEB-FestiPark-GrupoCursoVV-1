//evento de scroll para hacer transparente el header
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 10) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});


const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".nav");

hamburger.addEventListener("click", () => {
  nav.classList.toggle("open");
});


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