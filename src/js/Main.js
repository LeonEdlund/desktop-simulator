/**
 * Starting point for application.
 * Eventlistener removed once app is loaded.
 */
window.addEventListener("load", function () {
  var app = new App();
  app.start();
}, { once: true })





//console.log(Object.prototype.toString.call());