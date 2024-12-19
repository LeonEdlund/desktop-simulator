/**
 * Starting point for application
 * @returns {undefined}
 */
function main() {
  var app = new App();
  app.start();
}
window.addEventListener("load", main, { once: true });