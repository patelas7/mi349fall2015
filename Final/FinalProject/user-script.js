var title = '';
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
    else{
      sessionStorage.setItem("word", word);
      sessionStorage.setItem("hint", hint);
      sessionStorage.setItem("title", title);
      document.location.href = 'game.html';
    }
  });
});

function setCSS(){

  $(".container").css({"background-color":"#68838B"});
  $('#welcome').css({"font-size": "40px", "left" : "20%"});
  $('#welcome').text("Welcome " + sessionStorage.username);
}

function getJSON(){
  $.each($.parseJSON(sessionStorage.json), function(idx, obj) {
	   alert(obj.Title);
  });
}

function getSaved(){
  var data = {'method': 'retrieve', 'username': user};
  sendPost('game.php', data).done(function(res){
  if(res.hasGame == false){
    sessionStorage.setItem("savedGame", false);
  }
  else{
    sessionStorage.setItem("json", res);
  }
  }).final(function(xhr, textStatus, errorThrown){
    alert(xhr.responseText);
  });

}
