 function Scroll(sSelector) {
  var s = this;

  console.log(this);

  //свойства
  s.init(sSelector);

  s.topLink = s.findObj(".topLink");

  // методы
  s.showHideTopLink = function(){
    console.log(s.topLink);
    if ($(window).scrollTop() > 300) {
      s.topLink.show()
    }
    else {
      s.topLink.hide()
    }
  }

  s.slowScroll = function(){
    event.preventDefault();
    $("html,body")
    .stop()
    .animate({scrollTop:0}, "slow");
  }

  


  // события
$(window).scroll(s.showHideTopLink);
s.topLink.click(s.slowScroll);



}


Scroll.prototype = new Component();