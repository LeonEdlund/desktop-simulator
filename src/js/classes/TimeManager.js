// singleton (Can only have one instance and only exposes the instance and nothing else);
var TimeManager = (function () {
  function TimeManager() {
    this.subscribers = []; // array of callback functions
    this.timeAsStrings;

    this._updateTime();
    setInterval(this._updateTime.bind(this), 1000);
  }

  TimeManager.prototype._updateTime = function () {
    var now = new Date();
    this.timeAsStrings = {
      hour: now.getHours().toString().padStart(2, "0"),
      minutes: now.getMinutes().toString().padStart(2, "0"),
      seconds: now.getSeconds().toString().padStart(2, "0"),
    }
    this._renderSubscribers();
  }

  TimeManager.prototype._renderSubscribers = function () {
    this.subscribers.forEach(function (callback) {
      callback();
    });
  }

  TimeManager.prototype.subscribe = function (callback) {
    this.subscribers.push(callback);
    callback();
  }

  return {
    getInstance: function () {
      if (TimeManager._instance === undefined) {
        TimeManager._instance = new TimeManager();
      }
      return TimeManager._instance;
    }
  }
})();