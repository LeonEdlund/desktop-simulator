(function() {function CustomWindow(){if(this.constructor===CustomWindow)throw"Window is an abstract class.";}CustomWindow.prototype.appendTo=function(a){a.appendChild(this.m_element)};CustomWindow.prototype.closeWindow=function(){this.m_element.remove();this.dispose&&this.dispose();for(var a in this)this.hasOwnProperty(a)&&(this[a]=null)};
CustomWindow.prototype.m_createWindow=function(a,b){var c=document.createElement("div"),d=document.createElement("div"),e=document.createElement("div");c.classList.add(a);d.classList.add(b);e.classList.add("close");d.appendChild(e);c.appendChild(d);this.m_element=c;this.m_closeBtn=e;this.m_addListeners(d)};CustomWindow.prototype.m_addElement=function(a){this.m_element.appendChild(a)};
CustomWindow.prototype.m_addListeners=function(a){this.closeWindow=this.closeWindow.bind(this);this.m_closeBtn.addEventListener("click",this.closeWindow);this.m_dragHandler=new DragAndDropHandler(this.m_element,a,{boundaryTop:22})};function Dice(){this.amount=Math.floor(6*Math.random())+1;this.m_element=null;this.m_construct()}Dice.m_sides={1:"dice-side-one",2:"dice-side-two",3:"dice-side-three",4:"dice-side-four",5:"dice-side-five",6:"dice-side-six"};Dice.prototype.getScore=function(){return this.amount};Dice.prototype.generateDice=function(){this.m_element=document.createElement("li");this.m_element.className="dice "+Dice.m_sides[this.amount];return this.m_element};
Dice.prototype.roll=function(){this.amount=Math.floor(6*Math.random())+1;this.m_element.className="dice "+Dice.m_sides[this.amount]};Dice.prototype.delete=function(){this.m_element&&(this.m_element.remove(),this.m_element=null)};Dice.prototype.m_construct=function(){this.roll=this.roll.bind(this)};function ScoreCounter(){this.element=document.createElement("ul");this.m_counterLi=document.createElement("li");this.m_numbers=[document.createElement("li"),document.createElement("li"),document.createElement("li"),document.createElement("li"),document.createElement("li")];this.m_construct()}ScoreCounter.m_classNames="zero one two three four five six seven eight nine".split(" ");ScoreCounter.prototype.getCounter=function(){return this.element};
ScoreCounter.prototype.updateCounter=function(a){a=a.toString().padStart(5,"0");for(var b=0;b<a.length;b++)this.m_numbers[b].className=ScoreCounter.m_classNames[parseInt(a[b],10)]};ScoreCounter.prototype.appendTo=function(a){a.appendChild(this.element)};ScoreCounter.prototype.m_construct=function(){var a=this;this.m_counterLi.className="dice-toolbar-counter-wrapper";this.m_numbers.forEach(function(b){a.m_counterLi.appendChild(b)});this.element.appendChild(this.m_counterLi)};function DiceApplication(a,b){CustomWindow.call(this);this.m_allDice=[];this.m_counter=b;this.m_maxDice=a;this.m_construct()}DiceApplication.prototype=Object.create(CustomWindow.prototype);DiceApplication.prototype.constructor=DiceApplication;DiceApplication.m_audio=new Audio("/src/wav/add.wav");DiceApplication.prototype.dispose=function(){this.m_allDice.forEach(function(a){a.delete()})};
DiceApplication.prototype.m_construct=function(){this.m_createWindow("dice-window-wrapper","dice-menubar-wrapper");this.m_addElement(this.m_createToolbar());this.m_addElement(this.m_createDiceContainer())};
DiceApplication.prototype.m_createToolbar=function(){var a=document.createElement("div"),b=document.createElement("ul"),c=document.createElement("li"),d=document.createElement("li"),e=document.createElement("li"),f=document.createElement("li");a.classList.add("dice-toolbar-wrapper");c.classList.add("add");d.classList.add("remove");e.classList.add("roll");a.appendChild(b);b.appendChild(c);b.appendChild(d);b.appendChild(e);b.appendChild(f);f.appendChild(this.m_counter.getCounter());this.m_addToolbarListeners(c,
d,e);return a};DiceApplication.prototype.m_addToolbarListeners=function(a,b,c){a.addEventListener("click",this.m_insertDice.bind(this));b.addEventListener("click",this.m_removeLastDice.bind(this));c.addEventListener("click",this.m_rollAllDice.bind(this))};DiceApplication.prototype.m_createDiceContainer=function(){var a=document.createElement("div"),b=document.createElement("ul");a.classList.add("dice-content-wrapper");a.appendChild(b);this.m_diceContainer=b;return a};
DiceApplication.prototype.m_insertDice=function(){if(!(this.m_allDice.length>=this.m_maxDice)){var a=new Dice,b=a.generateDice();b.addEventListener("click",function(){a.roll();this.m_countScore()}.bind(this));this.m_allDice.push(a);this.m_diceContainer.appendChild(b);this.m_playSound();this.m_countScore()}};DiceApplication.prototype.m_removeLastDice=function(){0>=this.m_allDice.length||(this.m_allDice.pop().delete(),this.m_countScore(),this.m_playSound())};
DiceApplication.prototype.m_rollAllDice=function(){0>=this.m_allDice.length||(this.m_allDice.forEach(function(a){a.roll()}),this.m_countScore(),this.m_playSound())};DiceApplication.prototype.m_countScore=function(){var a=0;this.m_allDice.forEach(function(b){a+=b.getScore()});this.m_counter.updateCounter(a)};DiceApplication.prototype.m_playSound=function(){DiceApplication.m_audio.play()};var TimeManager=function(){function a(){this.m_subscribers=[];this.m_construct()}a.prototype.subscribe=function(b){this.m_subscribers.push(b);b()};a.prototype.unSubscribe=function(b){b=this.m_subscribers.indexOf(b);console.log(b);-1!==b&&this.m_subscribers.splice(b,1);console.log(this.m_subscribers)};a.prototype.m_construct=function(){this.m_updateTime();setInterval(this.m_updateTime.bind(this),1E3)};a.prototype.m_updateTime=function(){var b=new Date;this.m_timeAsStrings={hour:b.getHours().toString().padStart(2,
"0"),minutes:b.getMinutes().toString().padStart(2,"0"),seconds:b.getSeconds().toString().padStart(2,"0")};this.m_renderSubscribers()};a.prototype.m_renderSubscribers=function(){this.m_subscribers.forEach(function(b){b()})};return{getInstance:function(){void 0===a._instance&&(a._instance=new a);return a._instance}}}();function ClockApplication(a){CustomWindow.call(this);this.m_timeManager=a;this.m_clockContainer=document.createElement("div");this.m_digits={hour:this._createDigits("hour"),minutes:this._createDigits("minute"),seconds:this._createDigits("second")};this.m_construct()}ClockApplication.prototype=Object.create(CustomWindow.prototype);ClockApplication.prototype.constructor=ClockApplication;
ClockApplication.prototype.renderClock=function(){var a=this.m_timeManager.m_timeAsStrings,b=a.hour,c=a.minutes;a=a.seconds;this._updateDigits(this.m_digits.hour,b[0],b[1]);this._updateDigits(this.m_digits.minutes,c[0],c[1]);this._updateDigits(this.m_digits.seconds,a[0],a[1])};ClockApplication.prototype.dispose=function(){this.m_timeManager.unSubscribe(this.boundCallback)};
ClockApplication.prototype.m_construct=function(){this.m_createWindow("clock-window-wrapper","clock-menubar-wrapper");this.m_clockContainer.className="clock-content-wrapper";this.m_clockContainer.appendChild(this.m_digits.hour);this.m_clockContainer.appendChild(this.m_digits.minutes);this.m_clockContainer.appendChild(this.m_digits.seconds);this.m_addElement(this.m_clockContainer);this.boundCallback=this.renderClock.bind(this);this.m_timeManager.subscribe(this.boundCallback)};
ClockApplication.prototype._createDigits=function(a){var b=document.createElement("ul"),c=document.createElement("li"),d=document.createElement("li");b.classList.add("clock-digit-wrapper",a);c.className="clock-digit-zero";d.className="clock-digit-zero";b.appendChild(c);b.appendChild(d);return b};ClockApplication.prototype._updateDigits=function(a,b,c){a=a.querySelectorAll("li");a[0].className=this._getNumberClass(parseInt(b,10));a[1].className=this._getNumberClass(parseInt(c,10))};
ClockApplication.prototype._getNumberClass=function(a){return"clock-digit-zero clock-digit-one clock-digit-two clock-digit-three clock-digit-four clock-digit-five clock-digit-six clock-digit-seven clock-digit-eight clock-digit-nine".split(" ")[a]};function DragAndDropHandler(a,b,c){this.m_element=a;this.m_grabHandle=b;this.m_isDragging=!1;this.m_offsetY=this.m_offsetX=0;this.m_options={boundaryLeft:c&&c.boundaryLeft||0,boundaryTop:c&&c.boundaryTop||0};this.m_construct()}DragAndDropHandler.zIndex=1;DragAndDropHandler.prototype.dispose=function(){this.m_grabHandle.removeEventListener("mousedown",this.m_dragStart)};
DragAndDropHandler.prototype.m_construct=function(){this.m_dragStart=this.m_dragStart.bind(this);this.m_mouseMove=this.m_mouseMove.bind(this);this.m_mouseUp=this.m_mouseUp.bind(this);this.m_grabHandle.addEventListener("mousedown",this.m_dragStart)};
DragAndDropHandler.prototype.m_dragStart=function(a){this.m_isDragging=!0;DragAndDropHandler.zIndex++;this.m_offsetX=a.clientX-this.m_element.offsetLeft;this.m_offsetY=a.clientY-this.m_element.offsetTop;this.m_element.style.opacity=.5;this.m_element.style.zIndex=DragAndDropHandler.zIndex;document.addEventListener("mousemove",this.m_mouseMove);document.addEventListener("mouseup",this.m_mouseUp)};
DragAndDropHandler.prototype.m_mouseMove=function(a){if(this.m_isDragging){var b=Math.max(a.clientY-this.m_offsetY,this.m_options.boundaryTop);this.m_element.style.left=Math.max(a.clientX-this.m_offsetX,this.m_options.boundaryLeft)+"px";this.m_element.style.top=b+"px"}};DragAndDropHandler.prototype.m_mouseUp=function(a){this.m_isDragging&&(this.m_isDragging=!1);this.m_element.style.opacity=1;document.removeEventListener("mousemove",this.m_mouseMove);document.removeEventListener("mouseup",this.m_mouseUp)};function Main(){this.m_clockBtn=document.getElementById("icon-clock");this.m_diceBtn=document.getElementById("icon-dice");this.m_desktop=document.getElementById("page-content-wrapper")}Main.prototype.start=function(){this.m_diceBtn.addEventListener("click",this.m_openDiceWindow.bind(this));this.m_clockBtn.addEventListener("click",this.m_openClockWindow.bind(this))};Main.prototype.m_openDiceWindow=function(){var a=new ScoreCounter;(new DiceApplication(40,a)).appendTo(this.m_desktop)};
Main.prototype.m_openClockWindow=function(){var a=TimeManager.getInstance();(new ClockApplication(a)).appendTo(this.m_desktop)};window.addEventListener("load",function(){(new Main).start()},{once:!0});})();
