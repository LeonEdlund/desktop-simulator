/**
 * Creates or returns a instance of TimeManager.
 * 
 * @class
 * @classdesc A singleton class that keps track of the devices time.
 */
var TimeManager = (function () {
  //--------------------------------------------------------------------------
  // Constructor scope
  //--------------------------------------------------------------------------

  /**
   * ...
   * @constructor - Creates a TimeManager.
   */
  function TimeManager() {
    //--------------------------------------------------------------------------
    // Private properties
    //--------------------------------------------------------------------------

    /**
     * Array of callback functions.
     * 
     * @private
     * @type {Array}
     */
    this.m_subscribers = [];

    /**
     * Object with current time as strings.
     * 
     * @private
     * @type {Object}
     */
    this.m_timeAsStrings;


    //--------------------------------------------------------------------------
    // Constructor call
    //--------------------------------------------------------------------------

    /**
     * Invokes secondary constructor call.
     */
    this.m_construct();
  }

  //--------------------------------------------------------------------------
  // Public methods
  //--------------------------------------------------------------------------

  /**
   * Adds callback function to array.
   * 
   * @param {Function} callback - A callback function to render the current time. 
   * @returns {undefined}
   */
  TimeManager.prototype.subscribe = function (callback) {
    this.m_subscribers.push(callback);
    callback();
  }

  TimeManager.prototype.unSubscribe = function (callback) {
    var index = this.m_subscribers.indexOf(callback);
    if (index !== -1) {
      this.m_subscribers.splice(index, 1);
    }

    console.log(this.m_subscribers);
  }

  //--------------------------------------------------------------------------
  // Private methods
  //--------------------------------------------------------------------------

  /**
   * Secondary constructor.
   * 
   * @private
   * @returns {undefined}
   */
  TimeManager.prototype.m_construct = function () {
    this.m_updateTime();
    setInterval(this.m_updateTime.bind(this), 1000);
  }

  /**
   * ...
   * 
   * @private
   * @returns {undefined}
   */
  TimeManager.prototype.m_updateTime = function () {
    var now = new Date();
    this.m_timeAsStrings = {
      hour: now.getHours().toString().padStart(2, "0"),
      minutes: now.getMinutes().toString().padStart(2, "0"),
      seconds: now.getSeconds().toString().padStart(2, "0"),
    }
    this.m_renderSubscribers();
  }

  /**
   * ...
   * 
   * @private
   * @returns {undefined}
   */
  TimeManager.prototype.m_renderSubscribers = function () {
    this.m_subscribers.forEach(function (callback) {
      callback();
    });
  }


  return {
    /**
    * Retrieves the singleton instance of TimeManager.
    * If no instance exists, it creates one.
    * 
    * @public
    * @returns {TimeManager}
    */
    getInstance: function () {
      if (TimeManager._instance === undefined) {
        TimeManager._instance = new TimeManager();
      }
      return TimeManager._instance;
    }
  }
})();