(function() {function CustomWindow(){if(this.constructor===CustomWindow)throw"Window is an abstract class.";this.m_dragDropValues={nonTransparentValue:1,transparentValue:.5,offsetX:0,offsetY:0}}CustomWindow.m_zIndex=1;CustomWindow.prototype.appendTo=function(a){a.appendChild(this.m_element)};
CustomWindow.prototype.closeWindow=function(){this.m_closeBtn.removeEventListener("click",this.closeWindow);this.m_menubar.removeEventListener("mousedown",this.m_dragStart);this.m_element.remove();this.dispose&&this.dispose();for(var a in this)this.hasOwnProperty(a)&&(this[a]=null);Main.allWindows&&(a=Main.allWindows.indexOf(this),-1!==a&&Main.allWindows.splice(a,1))};
CustomWindow.prototype.m_construct=function(){this.m_dragStart=this.m_dragStart.bind(this);this.closeWindow=this.closeWindow.bind(this);this.m_mouseMove=this.m_mouseMove.bind(this);this.m_mouseUp=this.m_mouseUp.bind(this)};
CustomWindow.prototype.m_createWindow=function(a,b){var c=document.createElement("div"),d=document.createElement("div"),e=document.createElement("div");c.classList.add(a);d.classList.add(b);e.classList.add("close");d.appendChild(e);c.appendChild(d);this.m_element=c;this.m_menubar=d;this.m_closeBtn=e;this.m_addListeners()};CustomWindow.prototype.m_addElement=function(a){this.m_element.appendChild(a)};
CustomWindow.prototype.m_addListeners=function(){this.m_closeBtn.addEventListener("click",this.closeWindow);this.m_menubar.addEventListener("mousedown",this.m_dragStart)};
CustomWindow.prototype.m_dragStart=function(a){"close"!==a.target.className&&(CustomWindow.m_zIndex++,this.m_dragDropValues.offsetX=a.offsetX,this.m_dragDropValues.offsetY=a.offsetY,this.m_element.style.opacity=this.m_dragDropValues.transparentValue,this.m_element.style.zIndex=CustomWindow.m_zIndex,document.addEventListener("mousemove",this.m_mouseMove),document.addEventListener("mouseup",this.m_mouseUp))};
CustomWindow.prototype.m_mouseMove=function(a){var b=Math.max(a.clientY-this.m_dragDropValues.offsetY,22);this.m_element.style.left=Math.max(a.clientX-this.m_dragDropValues.offsetX,0)+"px";this.m_element.style.top=b+"px"};CustomWindow.prototype.m_mouseUp=function(a){this.m_element.style.opacity=this.m_dragDropValues.nonTransparentValue;document.removeEventListener("mousemove",this.m_mouseMove);document.removeEventListener("mouseup",this.m_mouseUp)};function ScoreCounter(){this.m_element=document.createElement("ul");this.m_numbers=[document.createElement("li"),document.createElement("li"),document.createElement("li"),document.createElement("li"),document.createElement("li")];this.m_construct()}ScoreCounter.prototype.getCounter=function(){return this.m_element};
ScoreCounter.prototype.updateCounter=function(a){if(a.toString().length>this.m_numbers.length)throw"The score is too big and can only be 5 digits long";a=a.toString().padStart(5,"0");for(var b="zero one two three four five six seven eight nine".split(" "),c=0;c<a.length;c++)this.m_numbers[c].className=b[parseInt(a[c],10)]};ScoreCounter.prototype.dispose=function(){this.m_numbers=this.m_element=null};
ScoreCounter.prototype.m_construct=function(){this.m_element.className="dice-toolbar-counter-wrapper";this.m_numbers.forEach(function(a){this.m_element.appendChild(a)}.bind(this))};function Dice(){}Dice.prototype.getScore=function(){return this.m_amount};Dice.prototype.generateDice=function(){this.m_element=document.createElement("li");this.roll();return this.m_element};Dice.prototype.roll=function(){this.m_amount=Math.floor(6*Math.random())+1;this.m_element.className="dice "+"dice-side-one dice-side-two dice-side-three dice-side-four dice-side-five dice-side-six".split(" ")[this.m_amount-1]};
Dice.prototype.delete=function(){this.m_element&&(this.m_element.remove(),this.m_element=null)};function DiceApplication(a,b){CustomWindow.call(this);this.m_allDice=[];this.m_maxDice=a;this.m_toolbarBtns={add:null,remove:null,roll:null};this.m_scoreCounter=b;this.m_construct()}DiceApplication.prototype=Object.create(CustomWindow.prototype);DiceApplication.prototype.constructor=DiceApplication;DiceApplication.prototype.m_audio=new Audio("src/wav/add.wav");
DiceApplication.prototype.dispose=function(){this.m_toolbarBtns.add.removeEventListener("click",this.m_insertDice);this.m_toolbarBtns.remove.removeEventListener("click",this.m_removeLastDice);this.m_toolbarBtns.roll.removeEventListener("click",this.m_rollAllDice);this.m_diceContainer.parentElement.removeEventListener("click",this.m_reRollSingleDice);this.m_scoreCounter.dispose();this.m_allDice.forEach(function(a){a.delete()});this.m_allDice=[]};
DiceApplication.prototype.m_construct=function(){CustomWindow.prototype.m_construct.call(this);this.m_insertDice=this.m_insertDice.bind(this);this.m_removeLastDice=this.m_removeLastDice.bind(this);this.m_rollAllDice=this.m_rollAllDice.bind(this);this.m_reRollSingleDice=this.m_reRollSingleDice.bind(this);CustomWindow.prototype.m_createWindow.call(this,"dice-window-wrapper","dice-menubar-wrapper");CustomWindow.prototype.m_addElement.call(this,this.m_createToolbar());CustomWindow.prototype.m_addElement.call(this,
this.m_createDiceContainer());this.m_addEvents()};
DiceApplication.prototype.m_createToolbar=function(){var a=document.createElement("div"),b=document.createElement("ul");this.m_toolbarBtns.add=document.createElement("li");this.m_toolbarBtns.remove=document.createElement("li");this.m_toolbarBtns.roll=document.createElement("li");var c=document.createElement("li");a.classList.add("dice-toolbar-wrapper");this.m_toolbarBtns.add.classList.add("add");this.m_toolbarBtns.remove.classList.add("remove");this.m_toolbarBtns.roll.classList.add("roll");a.appendChild(b);
b.append(this.m_toolbarBtns.add,this.m_toolbarBtns.remove,this.m_toolbarBtns.roll,c);c.appendChild(this.m_scoreCounter.getCounter());return a};DiceApplication.prototype.m_createDiceContainer=function(){var a=document.createElement("div"),b=document.createElement("ul");a.classList.add("dice-content-wrapper");a.appendChild(b);this.m_diceContainer=b;return a};
DiceApplication.prototype.m_addEvents=function(){this.m_toolbarBtns.add.addEventListener("click",this.m_insertDice);this.m_toolbarBtns.remove.addEventListener("click",this.m_removeLastDice);this.m_toolbarBtns.roll.addEventListener("click",this.m_rollAllDice);this.m_diceContainer.parentElement.addEventListener("click",this.m_reRollSingleDice)};
DiceApplication.prototype.m_reRollSingleDice=function(a){a=Array.from(this.m_diceContainer.children).indexOf(a.target);-1!==a&&(this.m_allDice[a].roll(),this.m_countScore(),this.m_playSound())};DiceApplication.prototype.m_insertDice=function(){if(!(this.m_allDice.length>=this.m_maxDice)){var a=new Dice,b=a.generateDice();this.m_allDice.push(a);this.m_diceContainer.appendChild(b);this.m_playSound();this.m_countScore()}};
DiceApplication.prototype.m_removeLastDice=function(){0>=this.m_allDice.length||(this.m_allDice.pop().delete(),this.m_playSound(),this.m_countScore())};DiceApplication.prototype.m_rollAllDice=function(){0>=this.m_allDice.length||(this.m_allDice.forEach(function(a){a.roll()}),this.m_playSound(),this.m_countScore())};DiceApplication.prototype.m_countScore=function(){var a=0;this.m_allDice.forEach(function(b){a+=b.getScore()});this.m_scoreCounter.updateCounter(a)};
DiceApplication.prototype.m_playSound=function(){this.m_audio.play()};function TimeManager(){if(TimeManager.m_instance)return TimeManager.m_instance;this.m_subscribers=[];this.m_construct()}TimeManager.getInstance=function(){TimeManager.m_instance||(TimeManager.m_instance=new TimeManager);return TimeManager.m_instance};TimeManager.prototype.subscribe=function(a){this.m_subscribers.push(a);1===this.m_subscribers.length&&(this.m_intervalId=setInterval(this.m_updateTime.bind(this),1E3));this.m_updateTime()};
TimeManager.prototype.unSubscribe=function(a){a=this.m_subscribers.indexOf(a);-1!==a&&this.m_subscribers.splice(a,1);0===this.m_subscribers.length&&this.m_dispose()};TimeManager.prototype.m_construct=function(){this.m_updateTime()};TimeManager.prototype.m_updateTime=function(){var a=(new Date).toTimeString().split(" ")[0].replaceAll(":","");this.m_renderSubscribers(a)};TimeManager.prototype.m_renderSubscribers=function(a){this.m_subscribers.forEach(function(b){b(a)})};
TimeManager.prototype.m_dispose=function(){clearInterval(this.m_intervalId)};function ClockApplication(a){CustomWindow.call(this);this.m_timeManager=a;this.m_construct()}ClockApplication.prototype=Object.create(CustomWindow.prototype);ClockApplication.prototype.constructor=ClockApplication;ClockApplication.prototype.dispose=function(){this.m_timeManager.unSubscribe(this.boundCallback)};
ClockApplication.prototype.m_construct=function(){CustomWindow.prototype.m_construct.call(this);CustomWindow.prototype.m_createWindow.call(this,"clock-window-wrapper","clock-menubar-wrapper");CustomWindow.prototype.m_addElement.call(this,this.m_createClock());this.boundCallback=this.m_updateDigits.bind(this);this.m_timeManager.subscribe(this.boundCallback)};
ClockApplication.prototype.m_createClock=function(){var a=document.createElement("div");a.className="clock-content-wrapper";var b=this.m_createDigits("hour");this.m_createDigits("hour");a.append(b,this.m_createDigits("minute"),this.m_createDigits("second"));return a};
ClockApplication.prototype.m_createDigits=function(a){var b=document.createElement("ul"),c=document.createElement("li"),d=document.createElement("li");b.classList.add("clock-digit-wrapper",a);c.className="clock-digit-zero";d.className="clock-digit-zero";b.append(c,d);return b};
ClockApplication.prototype.m_updateDigits=function(a){for(var b=this.m_element.querySelectorAll("li"),c="clock-digit-zero clock-digit-one clock-digit-two clock-digit-three clock-digit-four clock-digit-five clock-digit-six clock-digit-seven clock-digit-eight clock-digit-nine".split(" "),d=0;d<a.length;d++)b[d].className=c[parseInt(a[d],10)]};function Main(){this.m_clockBtn=document.getElementById("icon-clock");this.m_diceBtn=document.getElementById("icon-dice");this.m_desktop=document.getElementById("page-content-wrapper")}Main.allWindows=[];Main.prototype.start=function(){this.m_diceBtn.addEventListener("click",this.m_openDiceWindow.bind(this));this.m_clockBtn.addEventListener("click",this.m_openClockWindow.bind(this))};
Main.prototype.m_openDiceWindow=function(){var a=new DiceApplication(40,new ScoreCounter);Main.allWindows.push(a);a.appendTo(this.m_desktop)};Main.prototype.m_openClockWindow=function(){var a=new ClockApplication(TimeManager.getInstance());Main.allWindows.push(a);a.appendTo(this.m_desktop)};window.addEventListener("load",function(){(new Main).start()},{once:!0});})();
