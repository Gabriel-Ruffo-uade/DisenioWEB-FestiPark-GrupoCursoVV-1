document.addEventListener("DOMContentLoaded", function () {
  const html = `
    <a id="enlace-promo" href="./ofertas.html" target="_blank">
      Promos imperdibles
    </a>
  `;
  document.body.insertAdjacentHTML("beforeend", html);
});