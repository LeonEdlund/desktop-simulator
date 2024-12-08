function ClockApplication() {
  Window.call(this);
  this.createWindow("clock-window-wrapper", "clock-menubar-wrapper");
}

ClockApplication.prototype = Object.create(Window.prototype);
ClockApplication.prototype.constructor = ClockApplication;