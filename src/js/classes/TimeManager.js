/**
 * Creates or returns a instance of TimeManager.
 * 
 * @class
 * @classdesc - A singleton class that keps track and updates subscribers based on the current time.
 * @constructor
 */
function TimeManager() {
  if (TimeManager.m_instance) {
    return TimeManager.m_instance;
  }

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
   * The setInterval id. 
   * 
   * @private
   * @type {number}
   */
  this.m_intervalId;

  //--------------------------------------------------------------------------
  // Constructor call
  //--------------------------------------------------------------------------

  /**
   * Invokes secondary constructor call.
   */
  this.m_construct();
}

/**
* Retrieves the singleton instance of TimeManager.
* If no instance exists, it creates one.
*
* @static
* @public
* @returns {TimeManager}
*/
TimeManager.getInstance = function () {
  if (!TimeManager.m_instance) {
    TimeManager.m_instance = new TimeManager();
  }
  return TimeManager.m_instance;
}

//--------------------------------------------------------------------------
// Public methods
//--------------------------------------------------------------------------

/**
 * Adds callback function to array and sets update interval.
 * 
 * @param {Function} callback - A callback function to render the current time. 
 * @returns {undefined}
 */
TimeManager.prototype.subscribe = function (callback) {
  this.m_subscribers.push(callback);
  if (this.m_subscribers.length === 1) {
    this.m_intervalId = setInterval(this.m_updateTime.bind(this), 1000);
  }
  this.m_updateTime();
}

TimeManager.prototype.unSubscribe = function (callback) {
  var index = this.m_subscribers.indexOf(callback);
  if (index !== -1) {
    this.m_subscribers.splice(index, 1);
  }

  if (this.m_subscribers.length === 0) {
    this.m_dispose();
  }
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
}

/**
 * Updates the time as string.
 * 
 * @private
 * @returns {undefined}
 */
TimeManager.prototype.m_updateTime = function () {
  var now = new Date();
  var timeAsString = now.toTimeString().split(" ")[0].replaceAll(":", "");
  this.m_renderSubscribers(timeAsString);
}

/**
 * Calls all subscriber callback methods.
 * 
 * @private
 * @returns {undefined}
 */
TimeManager.prototype.m_renderSubscribers = function (timeAsString) {
  this.m_subscribers.forEach(function (callback) {
    callback(timeAsString);
  });
}

/**
 * Disposes of resources.
 * 
 * @private
 * @returns {undefined}
 */
TimeManager.prototype.m_dispose = function () {
  clearInterval(this.m_intervalId);
}