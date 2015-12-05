$(document).ready(function(){
  sessionStorage.setItem("word", "This isn't a bad test");
  sessionStorage.setItem("hint", "This is a hint");
  var guess = '';


  var c;
  for (var i = 65; 90 >= i; i++) {
    c = String.fromCharCode(i);
    //http://codepen.io/anon/pen/XXWajZ
    //html += '<button onclick="setLetter(\'' + c + '\');">' + c + '</button>';
    //html += '<button onclick="setLetter(\'' + c + '\');">' + c + '</button>';
    $('.alphabet').append('<button class=letter id="'+ c +'">' + c +'</button>');
  }
  //document.getElementById('box').innerHTML = html;
  $('.letter').click(function(){
    var id = this.id;
    alert(id);
  });
//  var setLetter = function(x) {
  //  document.getElementById('name').innerHTML += x;
//  };


});
