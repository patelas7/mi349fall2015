var wordTemp = '';
var wordLength = 0;
var correct = 0;
var bad = 0;

$(document).ready(function(){
  sessionStorage.setItem("word", "This isn't a bad test");
  sessionStorage.setItem("hint", "This is a hint");
  getAlphabet();

  //document.getElementById('box').innerHTML = html;

  createGame();
//  var setLetter = function(x) {
  //  document.getElementById('name').innerHTML += x;
//  };
  $('.letter').click(function(){
    clickedLetter($("#" + this.id).text());
    $("#" + this.id).prop("disabled", true);
  });

});

function clickedLetter(id){
  if(bad != 10){
    wordTemp = wordTemp.split("");
    var guess = false;
    for(var i=0; i<sessionStorage.word.length;i++){

      if(id == sessionStorage.word.charAt(i).toUpperCase()){

        wordTemp[i] = id;
        //console.log("wordTemp: " + wordTemp[i]);
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
    wordTemp = wordTemp.join("");
    $('.wordSolve').text(wordTemp);



  }
}

function createGame(){
  for(var i=0; i<sessionStorage.word.length; i++){
    if(/^[a-zA-Z]+$/.test(sessionStorage.word.charAt(i))){
      wordTemp += '_';

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
    $("#saveButton").hide();
    $("#hintButton").hide();
    $("#giveUpButton").hide();
    $("#newButton").css({"visibility":"visible","display":"block"});
    $("#gameStatus").text("Congratulations! You solved it!");
    $("#gameStatus").css({"visibility":"visible","display":"block"});
  }
  else if(bad == 1){
      $(".canvas").css({"background-image": "url(hangman-images/noose.png)"});
  }
  else if(bad == 2){
    $(".canvas").css({"background-image": "url(hangman-images/head.png)"});
  }
  else if(bad == 3){
    $(".canvas").css({"background-image": "url(hangman-images/body.png)"});
  }
  else if(bad == 4){
    $(".canvas").css({"background-image": "url(hangman-images/left-leg.png)"});
  }
  else if(bad == 5){
    $(".canvas").css({"background-image": "url(hangman-images/right-leg.png)"});
  }
  else if(bad == 6){
    $(".canvas").css({"background-image": "url(hangman-images/left-hand.png)"});
  }
  else if(bad == 7){
    $(".canvas").css({"background-image": "url(hangman-images/right-hand.png)"});
  }
  else if(bad == 8){
    $(".canvas").css({"background-image": "url(hangman-images/left-eye.png)"});
  }
  else if(bad == 9){
    $(".canvas").css({"background-image": "url(hangman-images/right-eye.png)"});
  }
  else if(bad == 10){
    $(".canvas").css({"background-image": "url(hangman-images/mouth.png)"});
    $("#saveButton").hide();
    $("#hintButton").hide();
    $("#giveUpButton").hide();
    $("#newButton").css({"visibility":"visible","display":"block"});
    $("#gameStatus").text("Game Over");
    $("#gameStatus").css({"visibility":"visible","display":"block"});

  }
}
