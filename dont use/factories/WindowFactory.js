//--------------------------------------------------------------------------
// Constructor scope
//--------------------------------------------------------------------------

/**
 * Creates a new instance of a WindowFactory.
 * 
 * @class
 * @classdesc - ...
 * @constructor - creates a WindowFactory object.
 */
function WindowFactory() { }

//--------------------------------------------------------------------------
// Public methods
//--------------------------------------------------------------------------

/**
 * Creates and returns a application depending on the input type.
 * 
 * @public
 * 
 * @param {string} type - The type of window that should be created, clock or dice. 
 * @returns {CustomWindow}
 */
WindowFactory.prototype.createWindow = function (type) {
  /**
   * @type {CustomWindow}
   */
  var window;

  if (type === "clock") {
    var timeManager = TimeManager.getInstance();
    window = new ClockApplication(timeManager);
  } else if (type === "dice") {
    var scoreCounter = new ScoreCounter();
    window = new DiceApplication(40, scoreCounter);
  }

  return window;
}