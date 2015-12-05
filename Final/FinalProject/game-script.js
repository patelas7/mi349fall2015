var wordTemp = '';
var wordLength = 0;
var correct = 0;
var bad = 0;

$(document).ready(function(){
  sessionStorage.setItem("word", "This isn't a bad test");
  sessionStorage.setItem("hint", "This is a hint");

  getAlphabet();

  //document.getElementById('box').innerHTML = html;
  $('.letter').click(function(){
    var id = this.id;
    alert(id);
  });
  createGame();
//  var setLetter = function(x) {
  //  document.getElementById('name').innerHTML += x;
//  };


});

function clickedLetter(id){
  wordTemp = wordTemp.split('');
  var guess = false;
  for(var i=0; i<sessionStorage.word.length;i++){
    if(id == sessionStorage.word.charAt(i).toUpperCase()){
      wordTemp[i] = id;
      correct++;
      guess = true;
      if(correct == wordLength){
        drawMan();
      }
    }
  }
  if(guess == false){
    bad++;
    drawMan();
  }
  $('.wordSolve').text(wordTemp.join(''));
}

function createGame(){
  for(var i=0; i<sessionStorage.word.length; i++){
    if(/^[a-zA-Z]+$/.test(sessionStorage.word.charAt(i))){
      wordTemp += '_ ';

      wordLength += 1;
    }
    else{
        wordTemp += sessionStorage.word.charAt(i);
    }
  }

  $('.wordSolve').text(wordTemp);
}

function getAlphabet(){
  var c;
  for (var i = 65; 90 >= i; i++) {
    c = String.fromCharCode(i);
    //http://codepen.io/anon/pen/XXWajZ
    //html += '<button onclick="setLetter(\'' + c + '\');">' + c + '</button>';
    //html += '<button onclick="setLetter(\'' + c + '\');">' + c + '</button>';
    $('.alphabet').append('<button class=letter id="'+ c +'">' + c +'</button>');
  }
}

function drawMan(){
  if(correct == wordLength){
    
  }
}
