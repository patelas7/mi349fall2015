var wordTemp = '';
var wordLength = 0;
var correct = 0;
var bad = 0;
var clickedString = '';
var text = '';

$(document).ready(function(){
  $(".container").css({"background-color":"#e5f2ff"});
  $(".top").css({"background-position":"center"});
  $('#welcome').text("Welcome " + sessionStorage.username);
  $('#title').text(sessionStorage.title);

  getAlphabet();

  if(sessionStorage.savedGame == "true"){
    console.log("wordTemp" + sessionStorage.wordTemp);
    console.log("wordLength" + sessionStorage.wordLength);
    console.log("correct" + sessionStorage.correct);
    console.log("bad" + sessionStorage.bad);
    console.log("clickedString" + sessionStorage.clickedString);

    wordTemp = sessionStorage.wordTemp;
    wordLength = sessionStorage.wordLength;
    correct = sessionStorage.correct;
    bad = sessionStorage.bad;
    clickedString = sessionStorage.clickedString;
    $('.wordSolve').text(wordTemp);
    savedLetters();
    drawMan();
  }
  else{
      createGame();
  }

  $('.letter').click(function(){
    clickedLetter($("#" + this.id).text());
    clickedString += $("#" + this.id).text();
    $("#" + this.id).prop("disabled", true);
  });

  $("#saveButton").click(function(){

    var data = {'method':'save', 'username':sessionStorage.username, 'title':sessionStorage.title, 'hint':sessionStorage.hint,
    'wordFinal':sessionStorage.word, 'wordTemp':wordTemp, 'wordLength':wordLength, 'correct':correct, 'bad':bad, 'clickedString':clickedString};
    sendPost('game.php', data).done(function(data) {
        if(data.save == false)
            alert(data.error);
        else{
          removeKeys();
          document.location.href = 'userPage.html';
        }
    })
    .fail(function(xhr, textStatus, errorThrown){
        alert(xhr.responseText);
    });

  });

  $("#hintButton").click(function(){
    alert(sessionStorage.hint);
  });

  $("#giveUpButton").click(function(){
      $('.wordSolve').text(sessionStorage.word);
      text = "You lose! Try again";
      endOfGame(text);
  });

  $("#newButton").click(function(){
    removeKeys();
    document.location.href = 'userPage.html';
  });

});

function clickedLetter(id){
  if(bad != 10){
    wordTemp = wordTemp.split("");
    var guess = false;
    for(var i=0; i<sessionStorage.word.length;i++){
      if(id == sessionStorage.word.charAt(i).toUpperCase()){
        wordTemp[i] = sessionStorage.word.charAt(i);
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

function savedLetters(){
  for(var i=0; i<clickedString.length;i++){
    if(/^[a-zA-Z]+$/.test(clickedString.charAt(i))){
     $("#" + clickedString.charAt(i).toUpperCase()).prop("disabled", true);
    }
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
    $('.alphabet').append('<button class=letter id="'+ c +'">' + c +'</button>');
  }
}

function drawMan(){
  if(correct == wordLength){
    text = "Congratulations! You solved it!";
    endOfGame(text);
  }
  else if(bad == 1){
    if($(".container").css("width") <= "825px")
      $(".canvas").css({"background-image": "url(hangman-images/nooseMin.png)"});
    else
      $(".canvas").css({"background-image": "url(hangman-images/noose.png)"});

  }
  else if(bad == 2){
    if($(".container").css("width") <= "825px")
      $(".canvas").css({"background-image": "url(hangman-images/headMin.png)"});
    else
      $(".canvas").css({"background-image": "url(hangman-images/head.png)"});
  }
  else if(bad == 3){
    if($(".container").css("width") <= "825px")
      $(".canvas").css({"background-image": "url(hangman-images/bodyMin.png)"});
    else
      $(".canvas").css({"background-image": "url(hangman-images/body.png)"});
  }
  else if(bad == 4){
    if($(".container").css("width") <= "825px")
      $(".canvas").css({"background-image": "url(hangman-images/left-leg-min.png)"});
    else
      $(".canvas").css({"background-image": "url(hangman-images/left-leg.png)"});
  }
  else if(bad == 5){
    if($(".container").css("width") <= "825px")
      $(".canvas").css({"background-image": "url(hangman-images/right-leg-min.png)"});
    else
      $(".canvas").css({"background-image": "url(hangman-images/right-leg.png)"});
  }
  else if(bad == 6){
    if($(".container").css("width") <= "825px")
      $(".canvas").css({"background-image": "url(hangman-images/left-hand-min.png)"});
    else
      $(".canvas").css({"background-image": "url(hangman-images/left-hand.png)"});
  }
  else if(bad == 7){
    if($(".container").css("width") <= "825px")
      $(".canvas").css({"background-image": "url(hangman-images/right-hand-min.png)"});
    else
      $(".canvas").css({"background-image": "url(hangman-images/right-hand.png)"});
  }
  else if(bad == 8){
    if($(".container").css("width") <= "825px")
      $(".canvas").css({"background-image": "url(hangman-images/left-eye-min.png)"});
    else
      $(".canvas").css({"background-image": "url(hangman-images/left-eye.png)"});
  }
  else if(bad == 9){
    if($(".container").css("width") <= "825px")
      $(".canvas").css({"background-image": "url(hangman-images/right-eye-min.png)"});
    else
      $(".canvas").css({"background-image": "url(hangman-images/right-eye.png)"});
  }
  else if(bad == 10){
    if($(".container").css("width") <= "825px")
      $(".canvas").css({"background-image": "url(hangman-images/mouthMin.png)"});
    else
      $(".canvas").css({"background-image": "url(hangman-images/mouth.png)"});
    text = "Game Over";
    endOfGame(text);

  }
}

function setCSS(){
  $(".container").css({"background-color":"white"});
}

function endOfGame(text){
  $("#saveButton").hide();
  $("#hintButton").hide();
  $("#giveUpButton").hide();
  $("#newButton").css({"visibility":"visible","display":"block"});
  $("#gameStatus").text(text);
  $("#gameStatus").css({"visibility":"visible","display":"block"});
  $('.wordSolve').text(sessionStorage.word);
}

function removeKeys(){

  sessionStorage.removeItem("savedGame");
  sessionStorage.removeItem("word");
  sessionStorage.removeItem("title");
  sessionStorage.removeItem("hint");
  sessionStorage.removeItem("correct");
  sessionStorage.removeItem("bad");
  sessionStorage.removeItem("wordTemp");
  sessionStorage.removeItem("wordLength");
  sessionStorage.removeItem("clickedString");
}
