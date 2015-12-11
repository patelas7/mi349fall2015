var title = '';
var appendDiv = '';
var data;
var jsonData;
var script = 'game.php';
$(document).ready(function(){
  getSaved();
  setCSS();
  $("#userNewButton").click(function(){
    var title = $('#userNewTitle').val();
    var hint = $('#userNewHint').val();
    var word = $('#userNewWord').val();
    if( title == "" || hint == "" || word == ""){
      alert("Fill in both title and hint");
    }
    else if(title.length > 25 )
      alert("Title is too big");
    else{
      sessionStorage.setItem("word", word);
      sessionStorage.setItem("hint", hint);
      sessionStorage.setItem("title", title);
      sessionStorage.setItem("savedGame", "false");
      document.location.href = 'game.html';
    }
  });

  $('#helpButton').click(function(){
      document.location.href = 'help.html';
  });

  $("#homeIcon").click(function(){

    var data = {'method':'logout', 'username' : sessionStorage.username};
    sendPost('login.php', data).done(function(data) {
        if(data.logout == false)
            alert(data.error);
        else{
          document.location.href = 'home.html';
        }
    })
    .fail(function(xhr, textStatus, errorThrown){
        alert(xhr.responseText);
    });

  });

});

function setCSS(){

  $(".container").css({"background-color":"#68838B"});
  $('#welcome').css({"font-size": "40px", "left" : "20%"});
  $('#welcome').text("Welcome " + sessionStorage.username);
}

function setSavedList(){
  var i = 0;

  $.each(jsonData, function() {
    appendDiv += '<div class=savedList id="save'+ i +'">' + this['Title'] +'</div>';
    i++;
  });
}

function getSaved(){
  data = {'method': 'retrieve', 'username': sessionStorage.username};
  sendPost(script, data).done(function(data) {
      if(data.hasGame == false){
        sessionStorage.setItem("savedGame", "false");
      }
      else{
        $('.savedGamesForm h2').text("Displaying Saved Games");
        jsonData = data;
        setSavedList();
        $('.savedGamesForm').append(appendDiv);
        $('.savedList').click(function(){

          clickedTitle($("#" + this.id).text());
          deleteGame($("#" + this.id).text());
        });
      }
  })
  .fail(function(xhr, textStatus, errorThrown){
      alert(xhr.responseText);
  });

}

function clickedTitle(id){
  sessionStorage.setItem("savedGame", "true");
  $.each(jsonData, function() {
    if(this['Title'] == id){
      sessionStorage.setItem("title", this['Title']);
      sessionStorage.setItem("hint", this['hint']);
      sessionStorage.setItem("word", this['wordFinal']);
      sessionStorage.setItem("wordTemp", this['wordTemp']);
      sessionStorage.setItem("wordLength", this['wordLength']);
      sessionStorage.setItem("correct", this['correct']);
      sessionStorage.setItem("bad", this['bad']);
      sessionStorage.setItem("clickedString", this['clickedString']);
    }
  });
}

function deleteGame(id){
  var data = {'method': 'delete', 'username': sessionStorage.username, 'title': id};
  sendPost(script, data).done(function(data) {
    if(data.delete == false){
      console.log(data);
      alert(data.error);
    }
    else{
      document.location.href = 'game.html';
    }
  })
  .fail(function(xhr, textStatus, errorThrown){
      alert("here");
      alert(xhr.responseText);
  });
}
