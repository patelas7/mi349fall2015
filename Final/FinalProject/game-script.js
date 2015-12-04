$(document).ready(function(){
  var html = '';
  var c;
  for (var i = 65; 90 >= i; i++) {// A-65, Z-90
    c = String.fromCharCode(i);
    //http://codepen.io/anon/pen/XXWajZ
    //html += '<button onclick="setLetter(\'' + c + '\');">' + c + '</button>';
    html += '<button onclick="setLetter(\'' + c + '\');">' + c + '</button>';
  }
  document.getElementById('box').innerHTML = html;

  var setLetter = function(x) {
    document.getElementById('name').innerHTML += x;
  };


});
