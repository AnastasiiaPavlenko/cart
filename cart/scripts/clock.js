 function Clock(sSelector) {
  var c = this;

  console.log(this);

  //свойства
  c.init(sSelector);

  // методы

  c.getTimeData = function(timeSelector, methodType){
    var today     = new Date();
    var time      = today[methodType]();
    var timePlace = c.findObj("." + timeSelector);
    timePlace.text(time < 10 ? "0" + time : time);
  }
  //c.getTimeData("hours", "getHours");
  //c.getTimeData("min", "getMinutes");
  //c.getTimeData("sec", "getSeconds");

  c.main = function(){
    c.getTimeData("hours", "getHours");
    c.getTimeData("min", "getMinutes");
    c.getTimeData("sec", "getSeconds");
  }

  c.main();

  setInterval(c.main, 1000);


  // события



}


Clock.prototype = new Component();